import pandas as pd
import random
import numpy as np
from datetime import datetime, timedelta
import seaborn as sns
import matplotlib.pyplot as plt

# Number of users and time period
num_users = 20
start_date = datetime(2022, 1, 1)
end_date = datetime(2024, 12, 31)
total_days = (end_date - start_date).days

# Define user personas
personas = ["casual", "highly_engaged", "inactive"]
user_profiles = []
for i in range(1, num_users + 1):
    start_persona = np.random.choice(personas)
    end_persona = np.random.choice(personas)
    seasonal = "Y" if i > 10 else "N"
    user_profiles.append({"user_id": i, "persona_start": start_persona, "persona_end": end_persona, "seasonal": seasonal})

users_df = pd.DataFrame(user_profiles)

# Load impact data
scoring_df = pd.read_csv('ds/data/meat-supply-per-person.csv')
scoring_df.rename(columns={
    'Entity': 'Country',
    'Meat, total | 00002943 || Food available for consumption | 0645pc || kilograms per year per capita': 'Meat'
}, inplace=True)
scoring_df.drop(columns=['Code', 'Year'], inplace=True)

df_co2 = pd.read_csv('ds/data/greenhouse-gas-emissions-per-kilogram-of-food-product.csv', index_col='Entity')
df_land = pd.read_csv('ds/data/land-use-per-kilogram-of-food-product.csv', index_col='Entity')
df_water = pd.read_csv('ds/data/freshwater-withdrawals-per-kilogram-of-food-product.csv', index_col='Entity')
df_meat_type = pd.read_csv('ds/data/per-capita-meat-type.csv')
population = pd.read_csv('ds/data/population-per-country.csv', header=2)

# Data transformation
population = population[['Country Code', 'Country Name', '2023']].rename(columns={'2023': 'Population'})
df_meat_type.columns = df_meat_type.columns.str.split('|').str[0]

# Calculate weighting per meat category based on world consumption data
comb = pd.merge(df_meat_type, population, left_on='Code', right_on='Country Code', how='inner')
tot_per_type = comb[['Meat, poultry ', 'Meat, beef ', 'Meat, sheep and goat ', 'Meat, pig ', 'Fish and seafood ']].mul(comb['Population'], axis=0).sum(axis=0)
pct_per_type = tot_per_type / tot_per_type.sum()
pct_per_type = pct_per_type.rename({'Meat, poultry ': 'Poultry Meat', 'Meat, beef ': 'Beef (beef herd)', 'Meat, sheep and goat ': 'Lamb & Mutton', 'Meat, pig ': 'Pig Meat', 'Fish and seafood ': 'Fish and seafood'})

# Aggregate impact per kg food per food category
df_env = pd.concat([df_co2, df_land, df_water], axis=1).drop(columns=['Year'])
df_env.rename(columns={
    'GHG emissions per kilogram (Poore & Nemecek, 2018)': 'GHG emissions',
    'Land use per kilogram (Poore & Nemecek, 2018)': 'Land',
    'Freshwater withdrawals per kilogram (Poore & Nemecek, 2018)': 'Freshwater'
}, inplace=True)

# Assign category labels
df_env['Category'] = ''
df_env.loc[['Beef (beef herd)', 'Fish (farmed)', 'Lamb & Mutton', 'Pig Meat', 'Prawns (farmed)', 'Poultry Meat'], 'Category'] = 'Meat or Seafood'
df_env.loc[['Cheese', 'Eggs', 'Milk', 'Beef (dairy herd)'], 'Category'] = 'Dairy'
df_env.loc[['Coffee', 'Dark Chocolate', 'Cane Sugar', 'Beet Sugar', 'Wine'], 'Category'] = 'Others'
df_env.loc[df_env['Category'] == '', 'Category'] = 'vegan meal'

# Compute category averages
df_summary = df_env.groupby('Category').mean()
df_meat_seafood = df_env.loc[df_env['Category'] == 'Meat or Seafood', ['GHG emissions', 'Land', 'Freshwater']]
df_summary.loc['Meat or Seafood'] = (df_meat_seafood.mul(pct_per_type, axis=0)).sum()

# Compute impact per meal
balanced_meal = (df_summary.loc['Meat or Seafood'] * 0.2 + df_summary.loc['vegan meal'] * 0.3)
plantbased_meal = (df_summary.loc['vegan meal'] * 0.5)
saved = (balanced_meal - plantbased_meal)

meal_weighting = pd.Series({'breakfast': 0.8, 'lunch': 1, 'dinner': 1})
impact_factors = {meal: saved.mul(meal_weighting[meal]).round(1) for meal in ['breakfast', 'lunch', 'dinner']}

def get_meat_per_day(df, country):
    if country in df['Country'].values:
        return df.loc[df['Country'] == country, 'Meat'].values[0] / 365
    return 0

def calculate_impact(meat_per_day, meal_type):
    return {
        'co2_saved': impact_factors[meal_type]['GHG emissions'],
        'water_saved': impact_factors[meal_type]['Freshwater'],
        'land_saved': impact_factors[meal_type]['Land'],
        'animals_saved': round((meat_per_day * meal_weighting[meal_type]) / 3, 3)
    }

daily_data = []
for _, user in users_df.iterrows():
    days = pd.date_range(start=start_date, end=end_date, freq='D')
    for day in days:
        meals = random.sample(['breakfast', 'lunch', 'dinner'], random.randint(1, 3))
        for meal_type in meals:
            meat_per_day = get_meat_per_day(scoring_df, 'Germany')
            impact = calculate_impact(meat_per_day, meal_type)
            daily_data.append({
                'user_id': user['user_id'], 'date': day, 'meal_type': meal_type,
                'co2_saved': impact['co2_saved'], 'water_saved': impact['water_saved'],
                'land_saved': impact['land_saved'], 'animals_saved': impact['animals_saved']
            })

df = pd.DataFrame(daily_data)
print(df.head())

# Visualization: Monthly meals logged per user
df["year_month"] = df["date"].dt.to_period("M")
monthly_meals = df.groupby(["user_id", "year_month"])['meal_type'].count().reset_index()
monthly_meals["year_month"] = monthly_meals["year_month"].astype(str)
monthly_meals["year_month"] = pd.to_datetime(monthly_meals["year_month"])

sns.set_theme(style="whitegrid")
user_ids = monthly_meals["user_id"].unique()

for user_id in user_ids:
    plt.figure(figsize=(8, 4))
    user_data = monthly_meals[monthly_meals["user_id"] == user_id]
    sns.lineplot(data=user_data, x="year_month", y="meal_type", marker="o", color="blue")
    plt.xticks(rotation=45)
    plt.title(f"Monthly Meals Logged for User {user_id}")
    plt.xlabel("Date")
    plt.ylabel("Meals Logged")
    plt.grid(True)
    plt.show()

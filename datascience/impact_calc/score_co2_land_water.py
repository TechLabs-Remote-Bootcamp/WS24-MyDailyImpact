
'''
20240112
Menglan Liu

The scripts is used to calculate the unit of carbon emissions, land and freshwater saved per plant-based meal, comparing to an average balanced meal.

A balanced meal typically consists of the following components:
Vegetables and Fruits (40-50% of the meal):
~200-250 g (e.g., salad, steamed vegetables, or fruit as a side).
Grains or Starches (25-30% of the meal):
~100-150 g (e.g., rice, pasta, potatoes, or bread).
Protein (20-25% of the meal):
~100-150 g (e.g., meat, fish, tofu, legumes, or eggs).
Fats (Small portion):
~10-20 g (e.g., oils, dressings, or nuts).

Based on the above, the following assumptions are made:
1. Every lunch and dinner contains 500 grams of food, and breakfast has 80% quantity of the other two meals.
2. A traditional balanced meal contains 40% animal product and 60% plant based product.
3. For simplicity, equal weighting is used to aggregate carbon emissions, land and freshwater per kg plant-based products from all available plant-based ingrediences. 
   While for animal products, since their higher impact, more nuance is considered. Weighted average based on world consumption is used in aggregation of different types of animal product 
   (e.g. poultry, pig, beef, etc) to the category animal product.

Input data for the calculation:
1. GHG emissions, land, water per food category: The paper (Poore & Nemecek, 2018) and downloaded from https://ourworldindata.org/environmental-impacts-of-food.
2. Meat consumption per meat category per country: FAO https://www.fao.org/faostat/en/#home
3. Population per country: from WorldBank https://data.worldbank.org/indicator/SP.POP.TOTL 

Calculation Steps:
1. Calculate weights of different types of animal product (e.g. poultry, pig, beef, etc) based on the world consumption data (2021). 
2. Aggregate impact per kg food per food category
   1) animal product aggregated using weights calculated in step 1
   2) other food categories aggregated using simple average of food ingredience. 
3. Calculate impact per balanced meal and plant-based meal
4. Calculate the impact of switching from balanced meal to plant-based meal



'''

import pandas as pd


############################### 1. Calculate weights of different types of animal product (e.g. poultry, pig, beef, etc) based on the world consumption data (2021). 
df_meat_type = pd.read_csv('datascience\impact_calc\data\per-capita-meat-type.csv')
population = pd.read_csv('datascience\impact_calc\data\population-per-country.csv',header=2)

# Data transformation
population = population[['Country Code','Country Name','2023']].rename(columns={'2023':'Population'})
df_meat_type.columns = df_meat_type.columns.str.split('|').str[0]

# Calculate weighting per meat category based on world consumption data
comb = pd.merge(df_meat_type,population,left_on = 'Code',right_on ='Country Code', how='inner')
tot_per_type = comb[['Meat, poultry ', 'Meat, beef ',
       'Meat, sheep and goat ', 'Meat, pig ',
       'Fish and seafood ']].mul(comb['Population'],axis=0).sum(axis=0)

pct_per_type = tot_per_type/tot_per_type.sum()
# map the  d
pct_per_type = pct_per_type.rename({'Meat, poultry ':'Poultry Meat', 'Meat, beef ':'Beef (beef herd)', 'Meat, sheep and goat ':'Lamb & Mutton', 'Meat, pig ': 'Pig Meat', 'Fish and seafood ':'Fish and seafood'})


#################################### 2. Aggregate impact per kg food per food category
df_co2 = pd.read_csv('datascience/impact_calc/data/greenhouse-gas-emissions-per-kilogram-of-food-product.csv',index_col='Entity')
df_land = pd.read_csv('datascience/impact_calc/data/land-use-per-kilogram-of-food-product.csv',index_col='Entity')
df_water = pd.read_csv('datascience/impact_calc/data/freshwater-withdrawals-per-kilogram-of-food-product.csv',index_col='Entity')

# combine three file to one dataframe and rearrange the columns
df = pd.concat([df_co2,df_land,df_water],axis = 1)
df = df.drop(columns = ['Year'])

df = df.rename(columns = {'GHG emissions per kilogram (Poore & Nemecek, 2018)':'GHG emissions',
       'Land use per kilogram (Poore & Nemecek, 2018)':'Land',
       'Freshwater withdrawals per kilogram (Poore & Nemecek, 2018)':'Freshwater'})

# Add category
df["Category"]=''
df.loc[['Beef (beef herd)','Fish (farmed)','Lamb & Mutton','Pig Meat','Prawns (farmed)','Poultry Meat'],'Category'] ='Meat or Seafood'
df.loc[['Cheese','Eggs','Milk','Beef (dairy herd)'],'Category'] = 'Dairy'
df.loc[['Coffee','Dark Chocolate','Cane Sugar','Beet Sugar','Wine'],'Category'] = 'Others'
df.loc[df['Category']=='','Category']='vegan meal'

# Average per category food per kg
df_summary = df.groupby('Category').mean()

#### for meat and seafood, replace averga weighting with consumption weighting  
# take the mean of fish and prawns to calculate the score for category Fish and seafood
df.loc['Fish and seafood',['GHG emissions', 'Land', 'Freshwater']] =df.loc[['Prawns (farmed)','Fish (farmed)'],['GHG emissions', 'Land', 'Freshwater']].mean()
df.loc['Fish and seafood','Category']='Meat or Seafood'
df = df.drop(index=['Prawns (farmed)','Fish (farmed)'])

df_meat_seafood = df.loc[df['Category']=='Meat or Seafood',['GHG emissions', 'Land', 'Freshwater']]
df_summary.loc['Meat or Seafood'] = (df_meat_seafood.mul(pct_per_type, axis=0)).sum()

################## 3. Calculate impact per balanced meal and plant-based meal
balanced_meal = (df_summary.loc['Meat or Seafood']*0.2 + df_summary.loc['vegan meal']*0.3)
plantbased_meal = (df_summary.loc['vegan meal']*0.5)

############# 4. Calculate the impact of switching from balanced meal to plant-based meal
saved = (balanced_meal - plantbased_meal)

meal_types = ['breakfast', 'lunch', 'dinner']
meal_weighting = pd.Series({
    'breakfast': 0.8,
    'lunch': 1,  
    'dinner': 1 
})

result =pd.DataFrame()
for meal in meal_types:
   result[meal] = saved.mul(meal_weighting[meal]).round(1)
   print(f"On average, a plant-based {meal} saves {result.loc['GHG emissions',meal]} kg CO2eq emissions.")
   print(f"On average, a plant-based {meal} saves {result.loc['Land',meal]} m² of land.")
   print(f"On average, a plant-based {meal} saves {result.loc['Freshwater',meal]} liters of freshwater.")

print(result)
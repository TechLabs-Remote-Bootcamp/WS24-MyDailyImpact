'''
20240113
Vanessa Türker

The script is used to calculate the unit of land animal lives saved per plant-based meal, depending on the selected country and the selected meal type (breakfast, lunch or dinner).

Meat consumption varies greatly from country to country, as a recent analysis of data from 2021 shows. Therefore, the input of the user, from which country he comes, is taken into account.

The data only refers to meat, fish is not taken into account here. Therefore, only the number of land animals saved is displayed.

The average per capita consumption of meat per year is shown. With 365 days per year, the average value per day is calculated first.

The following assumptions are made:

1. Less meat is eaten for breakfast than for lunch or dinner. The assumption is that only 15% of a daily amount should be consumed as breakfast.
2. For lunch or dinner, 100% of the average daily consumption of meat is assumed. 
3. Since chickens are the most slaughtered animal species (see FAO data, 2022), the number of animals saved per kilogram is based on this (75.21 billion, next 3.19 billion ducks).  Since a chicken can weigh between 2-4kg, I assume 3kg per chicken. Based on the previously calculated value for meat consumption per kg for breakfast, lunch and dinner, the number of animals is calculated.
The term land animal is used instead of chicken so that users are not confused if they do not eat chicken.
4. This calculation does not (yet) differentiate by gender. However, it can be assumed that men eat more meat than women. In a later step, meat consumption could therefore be weighted differently depending on gender.

The example of Germany makes this clear: average daily consumption is 76.59 kg (rounded). 
Converted to a day, this corresponds to 210 grams of meat per day over 365 days, which is a common amount for a meal. 
In concrete terms, this would mean for a user from Germany:  A lunch and a dinner with meat would each consume 210 g of meat. 
For breakfast, 31 g of meat (e.g. sausage) is consumed, i.e. only 15% of the daily amount.

The input data for the calculation is from the Food and Agriculture Organization (FAO) of the United Nations (2023), with major processing by Our World in Data
["Meat supply per person"](https://ourworldindata.org/grapher/meat-supply-per-person?tab=table&time=latest&v=1&csvType=filtered&useColumnShortNames=false) on the Our World in Data website.

Per capita consumption of meat: FAO
Last updated: March 14, 2024    
Date range: 2021  
Unit: kilograms per year per capita 
'''

import pandas as pd
import numpy as np

# load dataframe
df = pd.read_csv('datascience\impact_calc\data\meat-supply-per-person.csv')
print(df.head())

# drop columns
df = df.drop(columns=['Code', 'Year'])
print(df.head())

# rename columns
df.rename(columns={
    'Entity': 'Country',
    'Meat, total | 00002943 || Food available for consumption | 0645pc || kilograms per year per capita': 'Meat'
}, inplace=True)

print(df.head())

# Find the country's average meat consumption per day
def get_meat_per_day(df, country):
    # Check whether the country is present in the DataFrame
    if country in df['Country'].values:
        # Find the average meat consumption per day of the specified country
        meat_per_day = df.loc[df['Country'] == country, 'Meat'].values
        if len(meat_per_day) > 0:
            return meat_per_day[0] / 365
        
        else:
            raise IndexError("No value found")
    else:
        raise ValueError(f"Land '{country}' not in DataFrame")

# Example: calculate annual meat consumption for Albania
country_input = 'Germany'
try:
    meat_per_day = get_meat_per_day(df, country_input)
    
    animal_saved_breakfast = (meat_per_day * 0.15) / 3
    animal_saved_lunch = (meat_per_day * 1) / 3
    animal_saved_dinner = (meat_per_day * 1) / 3

    print(f"Daily meat consumption per person in {country_input}: {meat_per_day:.2f}")
    print(f"Land animal saved for breakfast: {animal_saved_breakfast:.2f}") 
    print(f"Land animal saved for lunch: {animal_saved_lunch:.2f}") 
    print(f"Land animal saved for dinner: {animal_saved_dinner:.2f}")
except (ValueError, IndexError) as e:
    print(e)


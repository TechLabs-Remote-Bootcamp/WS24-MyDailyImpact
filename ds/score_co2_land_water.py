import pandas as pd

# The data is from the paper (Poore & Nemecek, 2018)
# and downloaded from https://ourworldindata.org/environmental-impacts-of-food
df_co2 = pd.read_csv('data/greenhouse-gas-emissions-per-kilogram-of-food-product.csv',index_col='Entity')
df_land = pd.read_csv('data/land-use-per-kilogram-of-food-product.csv',index_col='Entity')
df_water = pd.read_csv('data/freshwater-withdrawals-per-kilogram-of-food-product.csv',index_col='Entity')

# combine three file to one dataframe and rearrange the columns
df = pd.concat([df_co2,df_land,df_water],axis = 1)
df = df.drop(columns = ['Year'])

df = df.rename(columns = {'GHG emissions per kilogram (Poore & Nemecek, 2018)':'GHG emissions',
       'Land use per kilogram (Poore & Nemecek, 2018)':'Land',
       'Freshwater withdrawals per kilogram (Poore & Nemecek, 2018)':'Freshwater'})

# Add category
df["Category"]=''
df.loc[['Beef (beef herd)','Beef (dairy herd)','Fish (farmed)','Lamb & Mutton','Pig Meat','Prawns (farmed)','Poultry Meat'],'Category'] ='Meat or Seafood'
df.loc[['Cheese','Eggs','Milk'],'Category'] = 'Dairy'
df.loc[['Coffee','Dark Chocolate','Cane Sugar','Beet Sugar','Wine'],'Category'] = 'Others'
df.loc[df['Category']=='','Category']='vegan meal'

# Average per category food per kg
df_summary = df.groupby('Category').mean()

'''
Calculate plant based meal on average saves per category:

A balanced meal typically consists of the following components:
Vegetables and Fruits (40-50% of the meal):
~200-250 g (e.g., salad, steamed vegetables, or fruit as a side).
Grains or Starches (25-30% of the meal):
~100-150 g (e.g., rice, pasta, potatoes, or bread).
Protein (20-25% of the meal):
~100-150 g (e.g., meat, fish, tofu, legumes, or eggs).
Fats (Small portion):
~10-20 g (e.g., oils, dressings, or nuts).

Assume per meal 500 grams, a balanced meal contains 200 grams of animal product and 300 grams of plant based product
saved = balanced meal - vegan meal
'''
balanced_meal = (df_summary.loc['Meat or Seafood']*0.2 + df_summary.loc['vegan meal']*0.3)
plantbased_meal = (df_summary.loc['vegan meal']*0.5)  
saved = (balanced_meal - plantbased_meal).round(1)

print(f"On average, a plant-based meal saves {saved['GHG emissions']} kg CO2eq emissions.")
print(f"On average, a plant-based meal saves {saved['Land']} m² of land.")
print(f"On average, a plant-based meal saves {saved['Freshwater']} liters of freshwater.")
print ('Calculation based on data from Poore & Nemecek (2018), https://ourworldindata.org')

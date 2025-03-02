# 20240115
# Anna von Bank
# Data from https://data.subak.org/dataset/su-eatable-life-a-comprehensive-database-of-carbon-and-water-footprints-of-food-commodities/resource/d7103775-5400-4676-a279-b026d134dc9b

import pandas as pd

# File path to the dataset
file_path = r"datascience\impact_calc\data\SuEatableLife_Food_Fooprint_database.xlsx"  # Replace this with your actual file path

# Step 1: Load the data
# Read the Excel file and load the relevant sheet containing water footprint data
data = pd.read_excel(file_path, sheet_name='SEL WF for users')

# Step 2: Filter relevant columns
# Keep only the columns for food items and their water footprints
filtered_data = data[['Food commodity ITEM', 'Water Footprint liters water/kg o liter of food ITEM']]
filtered_data = filtered_data.rename(columns={
    'Food commodity ITEM': 'Food Item',
    'Water Footprint liters water/kg o liter of food ITEM': 'Water Footprint (Liters/kg)'
})

# Step 3: Clean the data
# Remove rows where the water footprint value is missing or invalid
filtered_data = filtered_data.dropna(subset=['Water Footprint (Liters/kg)'])

# Step 4: Define categories
# Group food items into 'Animal Products' and 'Plant-Based'
categories = {
    'Animal Products': ['BEEF', 'PORK', 'CHICKEN', 'MILK', 'CHEESE', 'FISH', 'SALMON', 'TUNA', 'SHRIMP'],
    'Plant-Based': ['TOFU', 'LENTILS', 'POTATOES', 'RICE', 'APPLE JUICE', 'BEANS']
}

# Step 5: Categorize the food items
# Assign each food item to its respective category based on predefined groups
filtered_data['Category'] = filtered_data['Food Item'].apply(
    lambda x: next((cat for cat, items in categories.items() if x.upper() in items), None)
)

# Step 6: Filter out uncategorized items
# Remove food items that don't belong to either category
categorized_data = filtered_data.dropna(subset=['Category'])

# Step 7: Calculate average water footprint per category
avg_water_footprint = categorized_data.groupby('Category')['Water Footprint (Liters/kg)'].mean()

# Constants defining daily food consumption and meal composition
DAILY_FOOD_CONSUMPTION = 2.5  # 2.5 kg of total food consumed per day
ANIMAL_PRODUCTS_WEIGHT = 0.4  # 40% of total daily consumption is animal products
PLANT_BASED_WEIGHT_BALANCED = 0.6  # 60% of total daily consumption is plant-based products
PLANT_BASED_WEIGHT_PLANT_ONLY = 1.0  # 100% of daily consumption is plant-based for plant-based meal

# Step 8: Calculate water consumption for balanced and plant-based meals
balanced_meal_water = (
    avg_water_footprint['Animal Products'] * (DAILY_FOOD_CONSUMPTION * ANIMAL_PRODUCTS_WEIGHT) +
    avg_water_footprint['Plant-Based'] * (DAILY_FOOD_CONSUMPTION * PLANT_BASED_WEIGHT_BALANCED)
)
plant_based_meal_water = avg_water_footprint['Plant-Based'] * (DAILY_FOOD_CONSUMPTION * PLANT_BASED_WEIGHT_PLANT_ONLY)

# Calculate savings
water_savings = balanced_meal_water - plant_based_meal_water

# Step 9: Display detailed results
print("Water Consumption Analysis for Balanced vs Plant-Based Meals")
print("=" * 50)
print(f"Balanced meal water consumption: {balanced_meal_water:.2f} liters")
print(f"Plant-based meal water consumption: {plant_based_meal_water:.2f} liters")
print(f"Water savings per plant-based meal: {water_savings:.2f} liters")
print("=" * 50)

# Step 10: Expand to meal types (breakfast, lunch, dinner)
meal_types = ['breakfast', 'lunch', 'dinner']
meal_fractions = {
    'breakfast': 0.2,  # 20% for breakfast
    'lunch': 0.4,      # 40% for lunch
    'dinner': 0.4      # 40% for dinner
}

# Calculate water savings for each meal type
results_all_meals = {}
for meal in meal_types:
    fraction = meal_fractions[meal]  # Proportion of the total daily food consumption
    animal_water = (
        avg_water_footprint['Animal Products'] * (DAILY_FOOD_CONSUMPTION * ANIMAL_PRODUCTS_WEIGHT * fraction) +
        avg_water_footprint['Plant-Based'] * (DAILY_FOOD_CONSUMPTION * PLANT_BASED_WEIGHT_BALANCED * fraction)
    )
    plant_water = avg_water_footprint['Plant-Based'] * (DAILY_FOOD_CONSUMPTION * PLANT_BASED_WEIGHT_PLANT_ONLY * fraction)
    results_all_meals[meal] = {
        'Animal Water Consumption': animal_water,
        'Plant Water Consumption': plant_water,
        'Water Savings': animal_water - plant_water
    }

# Display results for all meal types
print("Detailed Water Savings per Meal Type")
print("=" * 50)
for meal, results in results_all_meals.items():
    print(f"{meal.capitalize()}:")
    print(f"  Animal-based water consumption: {results['Animal Water Consumption']:.2f} liters")
    print(f"  Plant-based water consumption: {results['Plant Water Consumption']:.2f} liters")
    print(f"  Water savings: {results['Water Savings']:.2f} liters")
    print("-" * 50)

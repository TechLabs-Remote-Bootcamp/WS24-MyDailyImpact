import pandas as pd
import random
from datetime import datetime, timedelta
import numpy as np

# -----------------------------
# STEP 1: Create the Recipe Dataset
# -----------------------------

# Set seeds for reproducibility
random.seed(42)
np.random.seed(42)

# Mapping for ingredient substitutions: if None, then no substitution available.
substitution_mapping = {
    "chicken": "tofu",  # chicken -> tofu
    "beef": "seitan",  # beef -> seitan
    "pork": "jackfruit",  # pork -> jackfruit
    "fish": "tempeh",  # fish -> tempeh
    "milk": "almond milk",  # milk -> almond milk
    "egg": "flax egg",  # egg -> flax egg
    "cheese": "vegan cheese",  # cheese -> vegan cheese
    "yogurt": "coconut yogurt",  # yogurt -> coconut yogurt
    # Already plant-based or neutral ingredients
    "pepper": None,
    "salt": None,
    "onion": None,
    "garlic": None,
    "tomato": None,
    "rice": None,
    "pasta": None,
    "quinoa": None,
    "spinach": None,
    "broccoli": None,
    "mushroom": None,
    "tofu": None,
}

# List of 50 unique dish names
dish_names = [
    "Protein Pasta",
    "Grilled Chicken Salad",
    "Vegan Buddha Bowl",
    "Simple Pasta",
    "Zucchini Noodles",
    "Local Curry",
    "Quinoa Salad",
    "Beef Stir-Fry",
    "Ramen with Veggies",
    "Stir-fried Rice",
    "Smoothie Bowl",
    "Mushroom Risotto",
    "Jackfruit Tacos",
    "Seitan Sandwich",
    "Tofu Stir-Fry",
    "Vegan Wrap",
    "Tempeh Salad",
    "Almond Milk Porridge",
    "Flax Egg Omelette",
    "Vegan Pizza",
    "Chickpea Curry",
    "Vegan Burrito",
    "Veggie Burger",
    "Vegan Pasta",
    "Spinach Lasagna",
    "Tofu Scramble",
    "Vegan Pancakes",
    "Miso Soup",
    "Vegan Chili",
    "Vegan Sushi",
    "Quinoa Bowl",
    "Vegan Pad Thai",
    "Vegan Korma",
    "Grilled Veggie Skewers",
    "Vegan Hotpot",
    "Vegetable Stir-Fry",
    "Vegan Casserole",
    "Vegan Shepherd’s Pie",
    "Vegan Risotto",
    "Vegan Curry",
    "Tofu Tacos",
    "Vegan Empanadas",
    "Vegan Mac & Cheese",
    "Vegan Burrito Bowl",
    "Vegan Wrap",
    "Vegan Fajitas",
    "Vegan Quesadilla",
    "Vegan Gnocchi",
    "Vegan Paella",
]


# Function to generate a random list of ingredients (3 to 6 ingredients)
def generate_ingredients():
    possible_ingredients = list(substitution_mapping.keys())
    num = random.randint(3, 6)
    return random.sample(possible_ingredients, num)


# For each ingredient list, generate:
# - portion_size: list of integers (grams)
# - substitutions_list: aligned with ingredients_list (using mapping; if None, then no substitution)
# - carbon_footprint_original: a random float value representing kg CO₂e for the ingredient.
def process_ingredients(ing_list):
    portion_sizes = [random.randint(50, 300) for _ in ing_list]
    subs_list = []
    carbon_footprint = []
    for ing in ing_list:
        sub = substitution_mapping.get(ing, None)
        subs_list.append(sub)
        # If substitution exists, assign a random carbon footprint value; else still assign a value.
        # Here we assume each ingredient has a carbon footprint; substitution availability does not change that.
        footprint = round(random.uniform(0.1, 5.0), 2)
        carbon_footprint.append(footprint)
    return portion_sizes, subs_list, carbon_footprint


# Generate 50 recipes
recipes = []
for dish in dish_names:
    ings = generate_ingredients()
    portions, subs, footprint = process_ingredients(ings)
    recipe_record = {
        "dish_name": dish,
        "ingredients_list": ings,
        "portion_size": portions,  # in grams, aligned with ingredients_list
        "substitutions_list": subs,  # aligned with ingredients_list
        "carbon_footprint_original": footprint,  # kg CO₂e per ingredient, aligned with ingredients_list
    }
    recipes.append(recipe_record)

df_recipes = pd.DataFrame(recipes)
print(df_recipes)  # Uncomment to inspect the recipe dataset

# -----------------------------
# STEP 2: Generate Activity Logs for Each Persona
# -----------------------------

# Define persona parameters in a dictionary
personas = {
    "Hardcore Henrietta": {
        "user_id": "Hardcore Henrietta",
        "num_records": 350,
        "weight_range": (75, 85),
        "height_range": (165, 175),
        "home_country": "Germany",
        "home_coords": (52.5200, 13.4050),  # Berlin
        "dish_preferences": ["Protein Pasta", "Beef Stir-Fry"],
        "meal_type_weights": {"Breakfast": 0.30, "Lunch": 0.35, "Dinner": 0.35},
        "substitution_prob": 0.35,
        "hunger_mean": 3.75,
        "meal_rating_mean": 4.25,
    },
    "Fit Felix": {
        "user_id": "Fit Felix",
        "num_records": 300,
        "weight_range": (70, 75),
        "height_range": (175, 180),
        "home_country": "Netherlands",
        "home_coords": (52.3676, 4.9041),  # Amsterdam
        "dish_preferences": ["Grilled Chicken Wrap", "Quinoa Salad"],
        "meal_type_weights": {"Breakfast": 0.40, "Lunch": 0.30, "Dinner": 0.30},
        "substitution_prob": 0.50,
        "hunger_mean": 3.0,
        "meal_rating_mean": 4.0,
    },
    "Vegan Vera": {
        "user_id": "Vegan Vera",
        "num_records": 250,
        "weight_range": (55, 60),
        "height_range": (165, 170),
        "home_country": "Sweden",
        "home_coords": (59.3293, 18.0686),  # Stockholm
        "dish_preferences": ["Vegan Buddha Bowl", "Quinoa Salad"],
        "meal_type_weights": {"Breakfast": 0.33, "Lunch": 0.33, "Dinner": 0.34},
        "substitution_prob": 0.15,
        "hunger_mean": 2.75,
        "meal_rating_mean": 4.25,
    },
    "Budget Billie": {
        "user_id": "Budget Billie",
        "num_records": 250,
        "weight_range": (58, 62),
        "height_range": (163, 167),
        "home_country": "India",
        "home_coords": (12.9716, 77.5946),  # Bangalore
        "dish_preferences": ["Simple Pasta", "Ramen with Veggies", "Stir-fried Rice"],
        "meal_type_weights": {"Breakfast": 0.25, "Lunch": 0.40, "Dinner": 0.35},
        "substitution_prob": 0.20,
        "hunger_mean": 4.0,
        "meal_rating_mean": 3.25,
    },
    "Diet Dani": {
        "user_id": "Diet Dani",
        "num_records": 350,
        "weight_range": (78, 82),
        "height_range": (168, 172),
        "home_country": "Italy",
        "home_coords": (41.9028, 12.4964),  # Rome
        "dish_preferences": ["Grilled Chicken Salad", "Zucchini Noodles", "Smoothie Bowl"],
        "meal_type_weights": {"Breakfast": 0.35, "Lunch": 0.30, "Dinner": 0.35},
        "substitution_prob": 0.45,
        "hunger_mean": 3.0,
        "meal_rating_mean": 3.75,
    },
    "Travel Terry": {
        "user_id": "Travel Terry",
        "num_records": 400,
        "weight_range": (75, 80),
        "height_range": (178, 182),
        "home_country": "Japan",
        "home_coords": (35.6895, 139.6917),  # Tokyo (home base)
        "dish_preferences": None,  # diverse, use any dish from dataset
        "meal_type_weights": {"Breakfast": 0.30, "Lunch": 0.35, "Dinner": 0.35},
        "substitution_prob": 0.50,
        "hunger_mean": 4.0,
        "meal_rating_mean": 3.75,
    },
}

# Define meal time ranges (hours) for each meal type
meal_time_ranges = {"Breakfast": (7, 9), "Lunch": (12, 14), "Dinner": (18, 20)}

# For Travel Terry, define a list of travel destination coordinates (besides home base)
travel_destinations = [
    (48.8566, 2.3522),  # Paris
    (40.7128, -74.0060),  # New York
    (-33.8688, 151.2093),  # Sydney
]


# Function to generate a random timestamp within the past 2 years, adjusted to meal_type hours.
def generate_timestamp(meal_type):
    now = datetime.now()
    two_years_ago = now - timedelta(days=730)
    # Random date between two_years_ago and now
    random_date = two_years_ago + (now - two_years_ago) * random.random()
    # Set hour based on meal type's range
    start_hour, end_hour = meal_time_ranges[meal_type]
    hour = random.randint(start_hour, end_hour)
    minute = random.randint(0, 59)
    second = random.randint(0, 59)
    random_date = random_date.replace(hour=hour, minute=minute, second=second, microsecond=0)
    return random_date


# Function to sample a rating (1-5) given a mean, with a small standard deviation.
def sample_rating(mean, sd=0.5):
    rating = int(round(np.clip(random.gauss(mean, sd), 1, 5)))
    return rating


# Function to sample a geo_location based on home_coords with slight noise.
def sample_geo_location(persona_name, home_coords):
    if persona_name == "Travel Terry":
        # 50% chance to use home base, else a random travel destination.
        base = home_coords if random.random() < 0.5 else random.choice(travel_destinations)
    else:
        base = home_coords
    lat_noise = random.uniform(-0.02, 0.02)
    lon_noise = random.uniform(-0.02, 0.02)
    return (round(base[0] + lat_noise, 4), round(base[1] + lon_noise, 4))


# -----------------------------
# STEP 3: Generate Activity Logs
# -----------------------------
activity_logs = []
record_counter = 1

for persona, params in personas.items():
    for i in range(params["num_records"]):
        # Identification & User Profile Fields
        record_id = f"rec_{record_counter:05d}"
        user_id = params["user_id"]
        weight = round(random.uniform(*params["weight_range"]), 1)
        height = round(random.uniform(*params["height_range"]), 1)
        country = params["home_country"]

        # Choose meal type based on weighted probabilities
        meal_types = list(params["meal_type_weights"].keys())
        weights_list = list(params["meal_type_weights"].values())
        meal_type = random.choices(meal_types, weights=weights_list, k=1)[0]

        # Generate timestamp for the record based on meal_type hours
        activity_timestamp = generate_timestamp(meal_type)

        # Recipe selection:
        # If persona has dish preferences, filter recipes by matching dish name keywords.
        if params["dish_preferences"]:
            preferred_recipes = df_recipes[
                df_recipes["dish_name"].str.contains(
                    "|".join(params["dish_preferences"]), case=False
                )
            ]
            if len(preferred_recipes) > 0:
                recipe = preferred_recipes.sample(n=1).iloc[0]
            else:
                recipe = df_recipes.sample(n=1).iloc[0]
        else:
            recipe = df_recipes.sample(n=1).iloc[0]

        # Meal & Ingredient Details from the recipe
        dish_name = recipe["dish_name"]
        ingredient_list = recipe["ingredients_list"]
        portion_size = recipe["portion_size"]
        substitutions_list = recipe["substitutions_list"]
        carbon_footprint_original = recipe["carbon_footprint_original"]

        # Determine if substitutions were made based on persona's substitution probability.
        substitutions_made = 1 if random.random() < params["substitution_prob"] else 0

        # Sample User Feedback Fields: hunger_rating and meal_rating
        hunger_rating = sample_rating(params["hunger_mean"])
        meal_rating = sample_rating(params["meal_rating_mean"])

        # Sample geo_location based on persona's home coordinates
        geo_location = sample_geo_location(user_id, params["home_coords"])

        # Construct the activity log record with all 16 fields.
        record = {
            "record_id": record_id,
            "user_id": user_id,
            "activity_timestamp": activity_timestamp,
            "weight": weight,
            "height": height,
            "country_of_residence": country,
            "dish_name": dish_name,
            "meal_type": meal_type,
            "ingredient_list": ingredient_list,
            "substitutions_list": substitutions_list,
            "substitutions_made": substitutions_made,
            "carbon_footprint_original": carbon_footprint_original,
            "portion_size": portion_size,
            "hunger_rating": hunger_rating,
            "meal_rating": meal_rating,
            "geo_location": geo_location,
        }

        activity_logs.append(record)
        record_counter += 1

# Convert the activity logs into a DataFrame.
df_activity = (
    pd.DataFrame(activity_logs)
    .sort_values(by="activity_timestamp", ascending=True)
    .reset_index(drop=True)
)
print(df_activity.describe())

# Verify that the dataset has 16 fields and print a sample.
print("Columns in the dataset (should be 16):", list(df_activity.columns))
print(df_activity.info())

# Sort activity records by timestamp
# df_activity.to_csv("ds/data/synthetic_activity_dataset-v0.csv", index=False)

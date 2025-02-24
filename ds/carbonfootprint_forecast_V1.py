# Anna von Bank 24.02.2025
# Code for carbonfootprint_forecast

import pandas as pd
import random
from datetime import datetime, timedelta
import numpy as np
import matplotlib.pyplot as plt

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
# print(df_recipes)  # Uncomment to inspect the recipe dataset

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

# ---------------------------
# EDA
# ---------------------------
import seaborn as sns


# ---------------------------
# 1. BASIC DATA INFORMATION
# ---------------------------

print("\n🔍 Basic Dataset Information:")
print(df_activity.info())

print("\n📌 First 5 Rows of Dataset:")
print(df_activity.head())

# Check for missing values
missing_values = df_activity.isnull().sum()
print("\n❗ Missing Values in Dataset:")
print(missing_values[missing_values > 0])

# Check unique users & meals
print(f"\n👤 Unique Users: {df_activity['user_id'].nunique()}")
print(f"🍽️ Unique Dishes: {df_activity['dish_name'].nunique()}")

# ---------------------------
# 2. DATA CLEANING
# ---------------------------

# Convert timestamp column to datetime
df_activity["activity_timestamp"] = pd.to_datetime(df_activity["activity_timestamp"])

# Convert lists stored as strings back to actual lists
list_columns = ["ingredient_list", "substitutions_list", "carbon_footprint_original", "portion_size"]
for col in list_columns:
    if df_activity[col].dtype == "object":
        df_activity[col] = df_activity[col].apply(lambda x: ast.literal_eval(x) if isinstance(x, str) else x)

# Convert geo_location to tuple
df_activity["geo_location"] = df_activity["geo_location"].apply(lambda x: ast.literal_eval(x) if isinstance(x, str) else x)

# ---------------------------
# 3. COMPUTE CO₂ SAVINGS
# ---------------------------

# Check if required columns exist
expected_columns = ["carbon_footprint_original", "substitutions_list"]
for col in expected_columns:
    if col not in df_activity.columns:
        raise KeyError(f"Missing column in dataset: {col}")

# Compute the original CO₂ footprint per meal
df_activity["carbon_footprint_original_total"] = df_activity["carbon_footprint_original"].apply(sum)

# Function to compute new CO₂ footprint after substitutions
def calculate_new_footprint(row):
    original_footprint = row["carbon_footprint_original"]
    substitutions = row["substitutions_list"]
    new_footprint = []
    for i, sub in enumerate(substitutions):
        if sub is not None:  # If substitution exists, assume a 30% CO₂ reduction
            new_footprint.append(original_footprint[i] * 0.7)
        else:
            new_footprint.append(original_footprint[i])
    return sum(new_footprint)

# Apply function to compute new CO₂ footprint
df_activity["carbon_footprint_new_total"] = df_activity.apply(calculate_new_footprint, axis=1)

# Compute actual CO₂ savings
df_activity["carbon_savings"] = df_activity["carbon_footprint_original_total"] - df_activity["carbon_footprint_new_total"]

# ---------------------------
# 4. DESCRIPTIVE STATISTICS
# ---------------------------

print("\n📊 Summary Statistics (Numerical Columns):")
print(df_activity.describe())

print("\n🔢 Summary Statistics (Categorical Columns):")
print(df_activity.describe(include="object"))

# ---------------------------
# 5. VISUALIZATIONS
# ---------------------------

# 🔹 CO₂ Savings Distribution
plt.figure(figsize=(10, 5))
sns.histplot(df_activity["carbon_savings"], bins=30, kde=True, color="green")
plt.title("Distribution of CO₂ Savings per Meal")
plt.xlabel("CO₂ Savings (kg CO₂e)")
plt.ylabel("Count")
plt.show()

# 🔹 CO₂ Savings Over Time

# Aggregate CO₂ savings per month
df_activity["activity_month"] = df_activity["activity_timestamp"].dt.to_period("M")
df_savings_per_month = df_activity.groupby("activity_month")["carbon_savings"].sum().reset_index()

plt.figure(figsize=(12, 6))
sns.lineplot(x=df_savings_per_month["activity_month"].astype(str), y=df_savings_per_month["carbon_savings"], marker="o")
plt.xticks(rotation=45)
plt.title("CO₂ Savings Trend Over Time")
plt.xlabel("Month")
plt.ylabel("Total CO₂ Savings (kg CO₂e)")
plt.grid(True)
plt.show()

# 🔹 CO₂ Savings Over Time per user
# Aggregate CO₂ savings per month for each user
df_activity["activity_month"] = df_activity["activity_timestamp"].dt.to_period("M")
df_savings_per_user = df_activity.groupby(["user_id", "activity_month"])["carbon_savings"].sum().reset_index()

# Convert activity_month to datetime for plotting
df_savings_per_user["activity_month"] = pd.to_datetime(df_savings_per_user["activity_month"].astype(str))

# Get unique users
unique_users = df_savings_per_user["user_id"].unique()

# Set up subplots (2 rows, 3 columns)
fig, axes = plt.subplots(nrows=2, ncols=3, figsize=(18, 10), sharex=True, sharey=True)

# Flatten axes array for easy iteration
axes = axes.flatten()

# Create a separate plot for each user
for i, user in enumerate(unique_users):
    user_data = df_savings_per_user[df_savings_per_user["user_id"] == user]
    sns.lineplot(ax=axes[i], x="activity_month", y="carbon_savings", data=user_data, marker="o", color="b")
    axes[i].set_title(f"CO₂ Savings Over Time: {user}")
    axes[i].set_xlabel("Month")
    axes[i].set_ylabel("CO₂ Savings (kg CO₂e)")
    axes[i].grid(True)

# Adjust layout
plt.tight_layout()
plt.show()

# 🔹 Meal Rating Distribution
plt.figure(figsize=(8, 5))
sns.histplot(df_activity["meal_rating"], bins=10, kde=True, color="blue")
plt.title("Meal Rating Distribution")
plt.xlabel("Meal Rating (1-5)")
plt.ylabel("Count")
plt.show()

# 🔹 Count occurrences of each user
user_counts = df_activity["user_id"].value_counts()
plt.figure(figsize=(12, 6))
sns.barplot(x=user_counts.index, y=user_counts.values, hue=user_counts.index, palette="mako", legend=False)
plt.xticks(rotation=45)  # Rotate x-axis labels for better visibility
plt.xlabel("User")
plt.ylabel("Number of Meals Logged")
plt.title("Meal Logs per User")
plt.show()



# ---------------------------
# Visualization: World map of Geolocations
# ---------------------------

!pip install folium
import folium
from folium.plugins import HeatMap
import ast

# 🔹 VISUALIZATION: WORLD MAP OF GEOLOCATIONS

# Ensure 'geo_location' column exists
if "geo_location" not in df_activity.columns:
    raise KeyError("Column 'geo_location' not found in df_activity.")

# Check if the first value is a string, convert only if needed
if isinstance(df_activity["geo_location"].iloc[0], str):
    df_activity["geo_location"] = df_activity["geo_location"].apply(eval)

# Extract latitudes and longitudes
latitudes = df_activity["geo_location"].apply(lambda x: x[0])
longitudes = df_activity["geo_location"].apply(lambda x: x[1])

# Create a Folium map centered at the average location
map_center = [np.mean(latitudes), np.mean(longitudes)]
map_meal_activity = folium.Map(location=map_center, zoom_start=2)

# Add markers for each meal activity
for lat, lon in zip(latitudes, longitudes):
    folium.Marker(location=[lat, lon], popup="Meal Activity").add_to(map_meal_activity)

# Display the interactive map inside Jupyter Notebook
display(map_meal_activity)

# ---------------------------
# Total carbon footprint forecast
# ---------------------------

import pandas as pd
import numpy as np
from statsmodels.tsa.arima.model import ARIMA
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error
import matplotlib.pyplot as plt


# Convert to datetime format for forecasting
df_savings_per_month["activity_month"] = df_savings_per_month["activity_month"].astype(str)
df_savings_per_month["activity_month"] = pd.to_datetime(df_savings_per_month["activity_month"])

# Train-Test split (Train: up to end of 2024, Test: 2025)
train_data = df_savings_per_month[df_savings_per_month["activity_month"] < "2025-01-01"]
test_data = df_savings_per_month[df_savings_per_month["activity_month"] >= "2025-01-01"]

# Store actual values for 2025
df_actual_2025 = test_data.copy()
df_actual_2025.rename(columns={"carbon_savings": "Actual CO₂ Savings"}, inplace=True)
print("\nActual CO₂ savings for 2025:")
print(df_actual_2025)

# Mean Forecast Model
mean_forecast = np.full(len(test_data), train_data["carbon_savings"].mean())

# ARIMA Model
arima_model = ARIMA(train_data["carbon_savings"], order=(5,1,0)).fit()
arima_forecast = arima_model.forecast(len(test_data))

# Random Forest Model
rf_model = RandomForestRegressor(n_estimators=100, random_state=42)
rf_model.fit(np.arange(len(train_data)).reshape(-1, 1), train_data["carbon_savings"])
rf_forecast = rf_model.predict(np.arange(len(train_data), len(train_data) + len(test_data)).reshape(-1, 1))

# Store forecasts for 2025
df_forecast_2025 = test_data.copy()
df_forecast_2025["Mean Forecast"] = mean_forecast
df_forecast_2025["ARIMA Forecast"] = arima_forecast
df_forecast_2025["Random Forest Forecast"] = rf_forecast
print("\nPredicted CO₂ savings for 2025:")
print(df_forecast_2025)

# Evaluate models
def evaluate_model(y_true, y_pred, model_name):
    mae = mean_absolute_error(y_true, y_pred)
    mse = mean_squared_error(y_true, y_pred)
    rmse = np.sqrt(mse)
    return {"Model": model_name, "MAE": mae, "MSE": mse, "RMSE": rmse}

results = []
results.append(evaluate_model(test_data["carbon_savings"], mean_forecast, "Mean Forecast"))
results.append(evaluate_model(test_data["carbon_savings"], arima_forecast, "ARIMA"))
results.append(evaluate_model(test_data["carbon_savings"], rf_forecast, "Random Forest"))
df_results = pd.DataFrame(results)
print("\nModel evaluation for CO₂ savings forecasts (Overall Population):")
print(df_results)

# Select the best model based on lowest MAE
best_model_name = df_results.loc[df_results["MAE"].idxmin(), "Model"]
print(f"\nThe best model for CO₂ savings forecast is: {best_model_name}")

# Forecast the remaining months of 2025 using the best model
future_months = pd.date_range(start="2025-03-01", periods=10, freq="ME")
if best_model_name == "Mean Forecast":
    forecast_2025_remaining = np.full(len(future_months), train_data["carbon_savings"].mean())
elif best_model_name == "ARIMA":
    forecast_2025_remaining = arima_model.forecast(len(future_months))
elif best_model_name == "Random Forest":
    forecast_2025_remaining = rf_model.predict(np.arange(len(train_data) + len(test_data), len(train_data) + len(test_data) + len(future_months)).reshape(-1, 1))

# Store extended forecast results
df_forecast_2025_remaining = pd.DataFrame({"Month": future_months, "Forecast using Best Model": forecast_2025_remaining})
print("\nExtended Forecast for Remaining 2025 Months using Best Model:")
print(df_forecast_2025_remaining)



# ---------------------------
# Forecast for each person
# ---------------------------

import pandas as pd
import numpy as np
from statsmodels.tsa.arima.model import ARIMA
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error
import matplotlib.pyplot as plt

# Aggregate CO₂ savings per month for each user
df_savings_per_user = df_activity.groupby(["user_id", "activity_month"])["carbon_savings"].sum().reset_index()

# Convert activity_month to datetime format
df_savings_per_user["activity_month"] = pd.to_datetime(df_savings_per_user["activity_month"].astype(str))

# Create an index for forecasting models
df_savings_per_user["month_index"] = df_savings_per_user["activity_month"].factorize()[0]


# Function to evaluate model errors
def evaluate_model(y_true, y_pred, model_name):
    mae = mean_absolute_error(y_true, y_pred)
    mse = mean_squared_error(y_true, y_pred)
    rmse = np.sqrt(mse)
    return {"Model": model_name, "MAE": mae, "MSE": mse, "RMSE": rmse}

# Generate predictions per user and select the best model
user_results = {}
best_models = {}
forecast_2025_results = {}
for user_id in df_savings_per_user["user_id"].unique():
    user_data = df_savings_per_user[df_savings_per_user["user_id"] == user_id]
    train_data = user_data[user_data["activity_month"] < "2025-01-01"]
    test_data = user_data[(user_data["activity_month"] >= "2025-01-01") & (user_data["activity_month"] < "2025-03-01")]
    
    if len(train_data) == 0 or len(test_data) == 0:
        continue
    
    mean_forecast = np.full(len(test_data), train_data["carbon_savings"].mean())
    arima_model = ARIMA(train_data["carbon_savings"].values, order=(5,1,0)).fit()
    arima_forecast = arima_model.forecast(len(test_data))
    rf_model = RandomForestRegressor(n_estimators=100, random_state=42)
    rf_model.fit(train_data["month_index"].values.reshape(-1, 1), train_data["carbon_savings"])
    rf_forecast = rf_model.predict(test_data["month_index"].values.reshape(-1, 1))
    
    errors = {
        "Mean Forecast": evaluate_model(test_data["carbon_savings"], mean_forecast, "Mean Forecast"),
        "ARIMA": evaluate_model(test_data["carbon_savings"], arima_forecast, "ARIMA"),
        "Random Forest": evaluate_model(test_data["carbon_savings"], rf_forecast, "Random Forest")
    }
    
    best_model = min(errors, key=lambda x: errors[x]["MAE"])
    best_models[user_id] = best_model
    user_results[user_id] = errors
    
    print(f"\nActual CO₂ savings for {user_id} (January-February 2025):")
    print(test_data)
    print(f"\nPredicted CO₂ savings for {user_id} (January-February 2025):")
    print(pd.DataFrame({"Month": test_data["activity_month"].values,
                        "Mean Forecast": mean_forecast,
                        "ARIMA Forecast": arima_forecast,
                        "Random Forest Forecast": rf_forecast}))
    print(f"\nError metrics for {user_id} (January-February 2025):")
    print(pd.DataFrame(errors).T)

# Extended forecast for the rest of 2025 using the best model
for user_id, best_model in best_models.items():
    user_data = df_savings_per_user[df_savings_per_user["user_id"] == user_id]
    train_data = user_data[user_data["activity_month"] < "2025-03-01"]
    future_months = pd.date_range(start="2025-03-01", periods=10, freq="ME")
    future_indices = np.arange(len(train_data), len(train_data) + len(future_months))
    
    if best_model == "Mean Forecast":
        forecast = np.full(len(future_months), train_data["carbon_savings"].mean())
    elif best_model == "ARIMA":
        arima_model = ARIMA(train_data["carbon_savings"].values, order=(5,1,0)).fit()
        forecast = arima_model.forecast(len(future_months))
    else:
        rf_model = RandomForestRegressor(n_estimators=100, random_state=42)
        rf_model.fit(train_data["month_index"].values.reshape(-1, 1), train_data["carbon_savings"])
        forecast = rf_model.predict(future_indices.reshape(-1, 1))
    
    forecast_2025_results[user_id] = pd.DataFrame({
        "Month": future_months,
        "Forecast using Best Model": forecast
    })
    print(f"\nExtended forecast for {user_id} (March-December 2025) using {best_model}:")
    print(forecast_2025_results[user_id])

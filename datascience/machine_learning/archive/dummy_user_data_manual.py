'''
Manual user data creation
Menglan Liu
20250211

The scripts aim to create user data over 3 years for 20 users. 
In order to create distinct user behaviors per user, the following measures are taken:
    1. define 3 personas for user, which dictate the activeness of user.
    2. include possibility of behavior shifts over time
    3. include possibility of seaonal variation


Concerns:
The 20 users could still be too similar to each other. i.e. it's possibly just 9 types of data

Possible improvements: 
1. consider introduce more noise in the user data
2. consider to define active days per user, rather than assigning persona.
3. consider each user has a different length of history log (1 month to 3 year)? Maybe not very useful  
  
'''
# Create 20 manual uer data for 3 years period

import pandas as pd
import random
import numpy as np
from datetime import datetime

# Define user personas with possible behavior shifts over time
users = [
    {"user_id": 1, "persona_start": "casual", "persona_end": "casual"},
    {"user_id": 2, "persona_start": "highly_engaged", "persona_end": "highly_engaged"},
    {"user_id": 3, "persona_start": "inactive", "persona_end": "inactive"},
    {"user_id": 4, "persona_start": "casual", "persona_end": "highly_engaged"},
    {"user_id": 5, "persona_start": "casual", "persona_end": "inactive"},
    {"user_id": 6, "persona_start": "highly_engaged", "persona_end": "casual"},
    {"user_id": 7, "persona_start": "highly_engaged", "persona_end": "inactive"},
    {"user_id": 8, "persona_start": "inactive", "persona_end": "casual"},
    {"user_id": 9, "persona_start": "inactive", "persona_end": "highly_engaged"},
    {"user_id": 10, "persona_start": "highly_engaged", "persona_end": "highly_engaged"},
    {"user_id": 11, "persona_start": "casual", "persona_end": "casual"},
    {"user_id": 12, "persona_start": "highly_engaged", "persona_end": "highly_engaged"},
    {"user_id": 13, "persona_start": "inactive", "persona_end": "inactive"},
    {"user_id": 14, "persona_start": "casual", "persona_end": "highly_engaged"},
    {"user_id": 15, "persona_start": "casual", "persona_end": "inactive"},
    {"user_id": 16, "persona_start": "highly_engaged", "persona_end": "casual"},
    {"user_id": 17, "persona_start": "highly_engaged", "persona_end": "inactive"},
    {"user_id": 18, "persona_start": "inactive", "persona_end": "casual"},
    {"user_id": 19, "persona_start": "inactive", "persona_end": "highly_engaged"},
    {"user_id": 20, "persona_start": "highly_engaged", "persona_end": "highly_engaged"}
]


# Add parameter for possibility for seasonal behavior variations
# set user 11-20 as seasonal
for user in users:
    if user["user_id"] <= 10:
        user["seasonal"] = "N"
    else:
        user["seasonal"] = "Y"
    

# Define engagement levels with meal probability weights
# e.g. highly engaged user uses the app ~90% of the days. On an active day, the user has 20% possibility to log 1 meal, and 40% possibility to log 2 or 3 meals.
engagement_levels = {
    "highly_engaged": {"days_active": 0.9, "meal_weights": [0.2, 0.4, 0.4]},
    "casual": {"days_active": 0.5, "meal_weights": [0.4, 0.4, 0.2]},
    "inactive": {"days_active": 0.2, "meal_weights": [0.7, 0.2, 0.1]},
}

# Function to model gradual behavior change
def transition_behavior(start_behavior, end_behavior, current_day, total_days):
    """Linearly interpolate engagement levels over 3 years."""
    weight = current_day / total_days  # Progress through 3 years
    start_params = engagement_levels[start_behavior]
    end_params = engagement_levels[end_behavior]

    # Gradually adjust active days probability
    days_active = (1 - weight) * start_params["days_active"] + weight * end_params["days_active"]

    # Blend meal weights
    meal_weights = [
        (1 - weight) * start_params["meal_weights"][i] + weight * end_params["meal_weights"][i]
        for i in range(3)
    ]

    return {"days_active": days_active, "meal_weights": meal_weights}

# Function to apply seasonal variations
def seasonal_adjustment(date, base_active_days):
    """Increase or decrease engagement probability based on season."""
    month = date.month
    if month in [1, 9]:  # High engagement in January & September
        return min(1.0, base_active_days + 0.1)
    elif month in [6, 7, 8, 12]:  # Lower engagement in summer & December
        return max(0, base_active_days - 0.2)
    return base_active_days  # Other months remain unchanged

# Generate 3 years of daily data
start_date = datetime(2022, 1, 1)
end_date = datetime(2024, 12, 31)
total_days = (end_date - start_date).days

def generate_daily_data(user):
    days = pd.date_range(start=start_date, end=end_date, freq='D')
    data = []

    for i, day in enumerate(days):
        # Adjust behavior gradually over time
        behavior_params = transition_behavior(user["persona_start"], user["persona_end"], i, total_days)
        
        # Apply seasonal effects
        if user["seasonal"] =='Y':
            adjusted_days_active = seasonal_adjustment(day, behavior_params["days_active"])
        else:
            adjusted_days_active = behavior_params["days_active"]
            
        # Determine if the user is active today
        is_active = random.random() < adjusted_days_active
        
        if is_active:
            # Choose meals per active day (1-3), weighted per persona
            meals_logged = random.choices([1, 2, 3], weights=behavior_params["meal_weights"], k=1)[0]

            # Session duration increases with meals logged
            session_duration = round(random.uniform(5, 10) * meals_logged, 1)
        else:
            meals_logged = 0
            session_duration = 0

        data.append({
            "user_id": user["user_id"],
            "date": day,
            "meals_logged": meals_logged,
            "session_duration": session_duration,
        })

    return data

# Generate data for all users
manual_data = []
for user in users:
    manual_data.extend(generate_daily_data(user))

# Convert to DataFrame
df = pd.DataFrame(manual_data)


############################################################################# Visualize user data for observation #################################################


import matplotlib.pyplot as plt
import seaborn as sns
import math


# Extract Year-Month for aggregation
df["year_month"] = df["date"].dt.to_period("M")

# Aggregate total meals logged per month per user
monthly_meals = df.groupby(["user_id", "year_month"])["meals_logged"].sum().reset_index()

# Convert year_month back to datetime for plotting
monthly_meals["year_month"] = monthly_meals["year_month"].astype(str)
monthly_meals["year_month"] = pd.to_datetime(monthly_meals["year_month"])

# Set Seaborn style
sns.set_theme(style="whitegrid")

# Get unique user IDs
user_ids = monthly_meals["user_id"].unique()

# Determine the number of rows needed for the grid (4 charts per row)
num_users = len(user_ids)
num_cols = 4  # 4 figures per row
num_rows = math.ceil(num_users / num_cols)  # Calculate required rows

# Set figure size for the entire grid
fig, axes = plt.subplots(num_rows, num_cols, figsize=(15, num_rows * 3), constrained_layout=True)

# Flatten axes array for easy iteration
axes = axes.flatten()

# Find y-axis limits (same for all plots)
y_min = 0
y_max = monthly_meals["meals_logged"].max()  # Max meals logged by any user in a month

# Plot each user's data in a separate subplot
for i, user_id in enumerate(user_ids):
    ax = axes[i]  # Get the subplot axis
    
    # Filter data for the current user
    user_data = monthly_meals[monthly_meals["user_id"] == user_id]
    
    # Plot line chart
    sns.lineplot(data=user_data, x="year_month", y="meals_logged", marker="o", color="blue", ax=ax)
    
    # Customize the plot
    ax.set_title(f"User {user_id}", fontsize=12)
    ax.set_xlabel("")
    ax.set_ylabel("Meals Logged")
    ax.set_xticks(user_data["year_month"][::6])  # Show every 6 months to reduce clutter
    ax.set_xticklabels(user_data["year_month"][::6].dt.strftime("%Y-%m"), rotation=45)
    ax.set_ylim(y_min, y_max)  # Apply the same y-axis scale to all plots
    ax.grid(True)

# Remove empty subplots (if user count isn't a perfect multiple of 4)
for j in range(i + 1, len(axes)):
    fig.delaxes(axes[j])

# Show the final grid of charts
plt.show()



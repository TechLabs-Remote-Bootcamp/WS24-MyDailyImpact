import pandas as pd
import numpy as np

# Create dummy data
data = {
    'gender': np.random.choice(['M', 'F'], size=100),
    'country': np.random.choice(['DE', 'UK', 'FR', 'IT', 'ES'], size=100),
    'age': np.random.randint(18, 65, size=100),
    'usage_habits': np.random.randint(1, 10, size=100),
    'land_savings': np.random.uniform(0, 5, size=100),
    'water_savings': np.random.uniform(0, 1000, size=100),
    'CO2_savings': np.random.uniform(0, 200, size=100),
    'animal_lives_saved': np.random.uniform(0, 2, size=100)
}

df = pd.DataFrame(data)
print(df.head())

# Still to do: Feature Engineering
# Create new features to improve the predictions, e.g. average values, standard deviations or seasonal influences.



from sklearn.model_selection import train_test_split

features = ['gender', 'country', 'age', 'usage_habits']
targets = ['land_savings', 'water_savings', 'CO2_savings', 'animal_lives_saved']

X = pd.get_dummies(df[features])
y = df[targets]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

from sklearn.ensemble import GradientBoostingRegressor
from sklearn.multioutput import MultiOutputRegressor

# training
model = MultiOutputRegressor(GradientBoostingRegressor(random_state=42))
model.fit(X_train, y_train)

# prediction
y_pred = model.predict(X_test)

# Model evaluation
from sklearn.metrics import mean_squared_error

mse = mean_squared_error(y_test, y_pred, multioutput='raw_values')
print(f'Mean Squared Error: {mse}')

# Apply to new data
new_data = pd.DataFrame({
    'gender': ['M'],
    'country': ['DE'],
    'age': [30],
    'usage_habits': [8]
})

new_data_encoded = pd.get_dummies(new_data).reindex(columns=X.columns, fill_value=0)
predictions = model.predict(new_data_encoded)

print(f'Predicted Savings: {predictions[0]}')

# To do: Interactive visualisations
# To do: Create dashboards or interactive visualisations to clearly show users their progress and potential savings.
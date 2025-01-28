import pandas as pd
import numpy as np

# Dummy-Daten generieren
num_users = 1000
np.random.seed(42)

data = {
    'user_id': np.arange(1, num_users + 1),
    'logins_per_week': np.random.poisson(5, num_users),
    'avg_session_duration': np.random.normal(10, 2, num_users),
    'recipes_viewed': np.random.poisson(20, num_users),
    'is_engaged': np.random.choice([0, 1], num_users)
}

# Daten in ein DataFrame laden
df_dummy = pd.DataFrame(data)
print(df_dummy.head())
print(df_dummy.tail())

# Feature-Engineering
df_dummy['total_interactions'] = df_dummy['logins_per_week'] + df_dummy['recipes_viewed']

# Dummy-Modelltraining (z.B. Random Forest)
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split

X = df_dummy[['logins_per_week', 'avg_session_duration', 'total_interactions']]
y = df_dummy['is_engaged']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Modellbewertung
accuracy = model.score(X_test, y_test)
print(f"Accuracy: {accuracy:.2f}")

# Ergebnis: Mit echten Daten wiederholen und anpassen

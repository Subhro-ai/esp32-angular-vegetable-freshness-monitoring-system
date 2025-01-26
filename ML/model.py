import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor, RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import mean_absolute_error, accuracy_score

# Load the datasets
original_data = pd.read_csv('ML/Datasets/Dataset.csv')
new_data = pd.read_csv('ML/Datasets/Fruits.csv')

# Preprocess the original dataset
original_data = original_data.drop(columns=["Unnamed: 0"])  # Drop unnecessary column

# Preprocess the new dataset
new_data = new_data.rename(columns={
    "Avg. Temp (C)": "Temp",
    "Avg. Humidity (%)": "Humidity",
    "CO? concentration(ppm)": "CO2",
    "Days to spoil": "Days"
})      
new_data["Spoiled"] = new_data["Days"].apply(lambda x: "Yes" if x <= 0 else "No")
new_data = new_data.drop(columns=["Sl  No."])

# Combine datasets
combined_data = pd.concat([original_data, new_data], ignore_index=True)

# Encode categorical columns
label_encoder_fruit = LabelEncoder()
combined_data['Fruit'] = label_encoder_fruit.fit_transform(combined_data['Fruit'])

label_encoder_spoiled = LabelEncoder()
combined_data['Spoiled'] = label_encoder_spoiled.fit_transform(combined_data['Spoiled'])

# Features and targets
X = combined_data[['Fruit', 'Temp', 'Humidity']]
y_days = combined_data['Days']  # Target for regression
y_spoiled = combined_data['Spoiled']  # Target for classification

# Train-test split
X_train, X_test, y_days_train, y_days_test, y_spoiled_train, y_spoiled_test = train_test_split(
    X, y_days, y_spoiled, test_size=0.2, random_state=42
)

# Model initialization
regressor = RandomForestRegressor(random_state=42)
classifier = RandomForestClassifier(random_state=42)

# Train models
regressor.fit(X_train, y_days_train)
classifier.fit(X_train, y_spoiled_train)

# Predictions
y_days_pred = regressor.predict(X_test)
y_spoiled_pred = classifier.predict(X_test)

# Evaluation
mae = mean_absolute_error(y_days_test, y_days_pred)
accuracy = accuracy_score(y_spoiled_test, y_spoiled_pred)

print(f"Mean Absolute Error for Days Prediction: {mae:.2f} days")
print(f"Accuracy for Spoiled Prediction: {accuracy * 100:.2f}%")

import joblib

# Save the regressor model
joblib.dump(regressor, 'ML/regressor_model.pkl')
print("Regressor model saved as 'regressor_model.pkl'")

# Save the classifier model
joblib.dump(classifier, 'ML/classifier_model.pkl')
print("Classifier model saved as 'classifier_model.pkl'")

import joblib
joblib.dump(label_encoder_fruit, "ML/label_encoder_fruit.pkl")
print("LabelEncoder saved as 'label_encoder.pkl'")
import joblib
import numpy as np


model_days = joblib.load("ML/regressor_model.pkl")
label_encoder_fruit = joblib.load("ML/label_encoder_fruit.pkl")
label_encoder_spoiled = joblib.load("ML/label_encoder_spoiled.pkl")

model_spoiled = joblib.load("ML/classifier_model.pkl")

data = np.array([["Tomato", 100, 74]])
data[0][0] = label_encoder_fruit.transform([data[0][0]])[0]
data = np.array(data, dtype=float)

prediction_days = model_days.predict(data)
print(f"Predicted Days to Spoil: {round(prediction_days[0], 2)} days")

prediction_spoiled = model_spoiled.predict(data)
spoiled_label = "Yes" if prediction_spoiled[0] == 1 else "No"
print(f"Is Spoiled: {spoiled_label}")

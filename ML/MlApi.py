import joblib
import numpy as np


model = joblib.load("ML/regressor_model.pkl")
label_encoder = joblib.load("ML/label_encoder_fruit.pkl")

data = np.array([["Tomato", -10, 74]])
data[0][0] = label_encoder.transform([data[0][0]])[0]
data = np.array(data, dtype=float)
prediction = model.predict(data)
print(f"Predicted Days to Spoil: {round(prediction[0], 2)} days")

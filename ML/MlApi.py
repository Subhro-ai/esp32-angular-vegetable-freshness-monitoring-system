from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import joblib
import numpy as np

# Initialize FastAPI app
app = FastAPI()

origins = [
    "http://localhost:4200",  # Allow the frontend origin
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allow only specified origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)


# Load ML models and encoders
model_days = joblib.load("regressor_model.pkl")
# model_spoiled = joblib.load("ML/classifier_model.pkl")
label_encoder_fruit = joblib.load("label_encoder_fruit.pkl")

# Define request schema
class PredictionRequest(BaseModel):
    fruit: str
    temperature: float
    humidity: float

# Define response schema
class PredictionResponse(BaseModel):
    days_to_spoil: float
    # spoiled: str

# API endpoint for predicting freshness
@app.post("/predict", response_model=PredictionResponse)
def predict_freshness(data: PredictionRequest):
    try:
        # Convert input to the format expected by the model
        input_data = np.array([[data.fruit, data.temperature, data.humidity]])
        input_data[0][0] = label_encoder_fruit.transform([input_data[0][0]])[0]
        input_data = np.array(input_data, dtype=float)

        # Make predictions
        prediction_days = model_days.predict(input_data)
        # prediction_spoiled = model_spoiled.predict(input_data)
        # spoiled_label = "Yes" if prediction_spoiled[0] == 1 else "No"

        # Return predictions as a response
        return PredictionResponse(
            days_to_spoil=round(prediction_days[0], 2),
            # spoiled=spoiled_label
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error making prediction: {str(e)}")

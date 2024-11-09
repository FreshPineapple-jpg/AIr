from typing import Union, Annotated

from fastapi import FastAPI, Body

from app.models.schemas import PredictionResponse, EnvironmentalData
from app.services.predictor import MLService

app = FastAPI()

mock_records = [
    {"temperature": 65, "pm10": 5, "carbon_dioxide": 400, "nitrogen_dioxide": 10, "dust": 0, "asthma_attack": 0},
    {"temperature": 70, "pm10": 15, "carbon_dioxide": 450, "nitrogen_dioxide": 15, "dust": 1, "asthma_attack": 1},
    {"temperature": 75, "pm10": 10, "carbon_dioxide": 420, "nitrogen_dioxide": 12, "dust": 0, "asthma_attack": 0},
    {"temperature": 80, "pm10": 20, "carbon_dioxide": 430, "nitrogen_dioxide": 18, "dust": 2, "asthma_attack": 1},
    {"temperature": 85, "pm10": 30, "carbon_dioxide": 460, "nitrogen_dioxide": 20, "dust": 0, "asthma_attack": 0}
]

@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}

@app.post("/predict", response_model=PredictionResponse)
async def predict(data: EnvironmentalData) -> PredictionResponse:
    """Train the model with the provided data"""
    ml_service = MLService()
    ml_service.train(mock_records)  # Train with mock records

    prediction, probability = ml_service.predict(data)

    return PredictionResponse(
        prediction=prediction,  # Return prediction (True/False)
        probability=probability  # Return probability for class 1 (asthma attack)
    )
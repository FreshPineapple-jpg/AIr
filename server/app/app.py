from typing import Union, Annotated

from fastapi import FastAPI, Body
from fastapi import HTTPException

from fastapi.responses import JSONResponse

from app.models.schemas import EnvironmentalData, PredictionResponse, PredictionRequest, ModelTrainingData
from app.services.predictor import MLService
from app.services.weather import WeatherService
from app.firebase import FIREBASE_CONFIG
from datetime import datetime

import firebase_admin
from firebase_admin import credentials, firestore

# Initialize Firebase using the config from the file
cred = credentials.Certificate(FIREBASE_CONFIG)
firebase_admin.initialize_app(cred)

# Access Firestore
db = firestore.client()

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
async def predict(data: PredictionRequest):
    try:
        ml_service = MLService()
        ml_service.train(mock_records)  

        weather_service = WeatherService()
        input_datetime = data.target_datetime

        target_datetime = datetime(
            input_datetime['year'], input_datetime['month'], input_datetime['day'], input_datetime['hour']
        )

        tmp, aq = await weather_service.get_weather_and_air_quality(
            latitude=data.latitude,
            longitude=data.longitude,
            target_datetime=target_datetime
        )

        data_dict = {
            "temperature": tmp,
            "pm10": aq['pm10'],
            "carbon_dioxide": aq['carbon_dioxide'],
            "nitrogen_dioxide": aq['nitrogen_dioxide'],
            "dust": aq['dust']
        }

        environmental_data = EnvironmentalData(**data_dict)
        
        prediction, probability = ml_service.predict(environmental_data)

        return PredictionResponse(
            prediction=prediction,
            probability=probability
        )
    except Exception as e:
        print(f"An error occurred: {e}")
        return JSONResponse(status_code=500, content={"message": str(e)})


collection_name = "training_data"

@app.post("/create_data/")
async def create_data(data: ModelTrainingData):
    try:
        db.collection(collection_name).add(data.dict())
        return {"message": "Data created successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@app.get("/get_data/{user_id}")
async def get_data(user_id: str):
    try:
        # Query Firestore using the filter keyword argument for where
        docs = db.collection(collection_name).where("user_id", "==", user_id).stream()

        # Check if no documents exist for the given user_id
        documents = [doc.to_dict() for doc in docs]
        if not documents:
            raise HTTPException(status_code=404, detail="Data not found for this user")

        # Return all documents found for this user
        return {"user_id": user_id, "data": documents}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.delete("/delete_data/{user_id}")
async def delete_data(user_id: str):
    try:
        docs = db.collection(collection_name).where("user_id", "==", user_id).stream()

        # Collect all document references to delete
        doc_refs = [doc.id for doc in docs]
        
        if not doc_refs:
            raise HTTPException(status_code=404, detail="No data found for this user to delete")

        for doc_ref in doc_refs:
            db.collection(collection_name).document(doc_ref).delete()

        return {"message": f"Successfully deleted {len(doc_refs)} document(s) for user {user_id}"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

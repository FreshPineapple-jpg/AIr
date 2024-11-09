from pydantic import BaseModel, Field
from datetime import datetime
from typing import List, Optional, Dict

class EnvironmentalData(BaseModel):
    temperature: float = Field(..., description="Temperature in Fahrenheit")
    pm10: float = Field(..., description="PM10 concentration")
    carbon_dioxide: float = Field(..., description="CO2 concentration")
    nitrogen_dioxide: float = Field(..., description="NO2 concentration")
    dust: float = Field(..., description="Dust level")

class PredictionRequest(BaseModel):
    latitude: float = Field(..., description="Latitude of the location")
    longitude: float = Field(..., description="Longitude of the location")
    target_datetime: Dict[str, int] = Field(..., description="Target datetime for weather data")

class PredictionResponse(BaseModel):
    prediction: bool
    probability: float

class ModelTrainingData(BaseModel):
    temperature: float = Field(..., description="Temperature in Fahrenheit")
    pm10: float = Field(..., description="PM10 concentration")
    carbon_dioxide: float = Field(..., description="CO2 concentration")
    nitrogen_dioxide: float = Field(..., description="NO2 concentration")
    dust: float = Field(..., description="Dust level")
    asthma_attack: bool = Field(..., description="Whether an asthma attack occurred")
from pydantic import BaseModel, Field
from datetime import datetime
from typing import List, Optional, Dict

class EnvironmentalData(BaseModel):
    temperature: float = Field(..., description="Temperature in Fahrenheit")
    pm10: float = Field(..., description="PM10 concentration")
    carbon_dioxide: float = Field(..., description="CO2 concentration")
    nitrogen_dioxide: float = Field(..., description="NO2 concentration")
    dust: float = Field(..., description="Dust level")


class PredictionResponse(BaseModel):
    prediction: bool
    probability: float
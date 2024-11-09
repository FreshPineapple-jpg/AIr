import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from typing import List, Tuple, Dict
from app.models.schemas import EnvironmentalData

class MLService:
    def __init__(self):
        self.model = RandomForestClassifier()
        self.feature_columns = ['temperature', 'pm10', 'carbon_dioxide', 'nitrogen_dioxide', 'dust']

    def train(self, records: List[Dict]) -> None:
        """Train the model with the provided records"""
        if not records:
            raise ValueError("No training data available")

        data = pd.DataFrame(records)
        X = data[self.feature_columns]
        y = data['asthma_attack']

        self.model.fit(X, y)
        print("Model trained")

    def predict(self, data: EnvironmentalData) -> Tuple[bool, float]:
        """Make a prediction"""
        # Ensure the input data is in the correct format (a single row DataFrame with features)
        input_data = pd.DataFrame([{
            "temperature": data.temperature,
            "pm10": data.pm10,
            "carbon_dioxide": data.carbon_dioxide,
            "nitrogen_dioxide": data.nitrogen_dioxide,
            "dust": data.dust
        }])

        # Ensure the input data matches the expected feature columns
        input_data = input_data[self.feature_columns]
        
        # Make prediction
        prediction = self.model.predict(input_data)[0]
        
        # Optionally, you can also get the probability of the prediction
        probability = self.model.predict_proba(input_data)[0][1]  # probability of class 1
        
        print(f"Prediction: {prediction}, Probability: {probability}")
        
        return bool(prediction), probability
from retry_requests import retry
from openmeteo_requests import Client
from requests_cache import CachedSession
from timezonefinder import TimezoneFinder
from datetime import datetime
import pytz
import pandas as pd
from typing import Dict, Optional

class WeatherService:
    def __init__(self):
        self.cache_session = CachedSession('.cache', expire_after=3600)
        self.retry_session = retry(self.cache_session, retries=5, backoff_factor=0.2)
        self.openmeteo = Client(session=self.retry_session)
        self.tf = TimezoneFinder()

    def get_current_time(self, latitude, longitude):
        # Find the time zone based on latitude and longitude
        timezone_str = self.tf.timezone_at(lat=latitude, lng=longitude)

        if timezone_str is None:
            raise ValueError("Could not determine the timezone for the given location.")

        # Get the current time in the specified time zone
        timezone = pytz.timezone(timezone_str)
        current_time = datetime.now(timezone)

        return current_time, timezone
    
    def calculate_past_days(self, latitude, longitude, target_datetime):
        # Get the current datetime and timezone based on latitude and longitude
        current_datetime, timezone = self.get_current_time(latitude, longitude)  # No need to pass latitude, longitude here

        # Make a copy of target_datetime and localize it to the timezone
        localized_target_datetime = timezone.localize(target_datetime)

        # Zero out minutes and seconds to consider only the hour
        current_datetime = current_datetime.replace(minute=0, second=0, microsecond=0)
        localized_target_datetime = localized_target_datetime.replace(minute=0, second=0, microsecond=0)

        # Calculate the time difference in hours
        time_difference = current_datetime - localized_target_datetime
        total_hours = time_difference.total_seconds() // 3600  # Total hours

        # Convert total hours to full past days
        past_days = int(total_hours // 24)

        # Add 1 for exclusivity if there are leftover hours or if they are exactly aligned
        if total_hours % 24 > 0 or total_hours == past_days * 24:
            past_days += 1

        return past_days

    async def fetch_weather_data(self, latitude, longitude, target_datetime):
        url = "https://api.open-meteo.com/v1/forecast"
        params = {
            "latitude": latitude,
            "longitude": longitude,
            "hourly": "temperature_2m",
            "temperature_unit": "fahrenheit",
            "timezone": "auto",
            "past_days": self.calculate_past_days(latitude, longitude, target_datetime),
            "forecast_days": 1
        }

        # Get the weather data from the API (example: using openmeteo API)
        responses = self.openmeteo.weather_api(url, params=params)

        # Process first location (since only one response is expected for now)
        response = responses[0]
        print(f"Coordinates {response.Latitude()}°N {response.Longitude()}°E")
        print(f"Elevation {response.Elevation()} m asl")
        print(f"Timezone {response.Timezone()} {response.TimezoneAbbreviation()}")
        print(f"Timezone difference to GMT+0 {response.UtcOffsetSeconds()} s")

        # Process hourly data
        hourly = response.Hourly()
        hourly_temperature_2m = hourly.Variables(0).ValuesAsNumpy()
        hourly_time = pd.to_datetime(hourly.Time(), unit="s", utc=True)

        # Create a DataFrame with hourly data
        hourly_data = {
            "date": pd.date_range(
                start=pd.to_datetime(hourly.Time(), unit="s", utc=True),
                end=pd.to_datetime(hourly.TimeEnd(), unit="s", utc=True),
                freq=pd.Timedelta(seconds=hourly.Interval()),
                inclusive="left"
            ),
            "temperature_2m": hourly_temperature_2m
        }

        hourly_dataframe = pd.DataFrame(data=hourly_data)

        # Find the temperature for the target_datetime
        target_datetime_utc = pd.to_datetime(target_datetime, utc=True)

        # Find the row where the date is closest to the target_datetime
        target_row = hourly_dataframe.loc[
            hourly_dataframe["date"] == target_datetime_utc
        ]

        if not target_row.empty:
            return target_row["temperature_2m"].values[0]
        else:
            print("Target datetime not found in the data.")
            return None

    async def fetch_air_quality_data(self, latitude, longitude, target_datetime):
        url = "https://air-quality-api.open-meteo.com/v1/air-quality"
        params = {
            "latitude": latitude,
            "longitude": longitude,
            "hourly": ["pm10", "carbon_dioxide", "nitrogen_dioxide", "dust"],
            "timezone": "auto",
            "past_days": self.calculate_past_days(latitude, longitude, target_datetime),
            "forecast_days": 1
        }

        # Get the air quality data from the API (example: using openmeteo API)
        responses = self.openmeteo.weather_api(url, params=params)

        # Process first location (since only one response is expected for now)
        response = responses[0]
        print(f"Coordinates {response.Latitude()}°N {response.Longitude()}°E")
        print(f"Elevation {response.Elevation()} m asl")
        print(f"Timezone {response.Timezone()} {response.TimezoneAbbreviation()}")
        print(f"Timezone difference to GMT+0 {response.UtcOffsetSeconds()} s")

        # Process hourly data
        hourly = response.Hourly()
        hourly_pm10 = hourly.Variables(0).ValuesAsNumpy()
        hourly_carbon_dioxide = hourly.Variables(1).ValuesAsNumpy()
        hourly_nitrogen_dioxide = hourly.Variables(2).ValuesAsNumpy()
        hourly_dust = hourly.Variables(3).ValuesAsNumpy()
        hourly_time = pd.to_datetime(hourly.Time(), unit="s", utc=True)

        # Create a DataFrame with hourly data
        hourly_data = {
            "date": pd.date_range(
                start=pd.to_datetime(hourly.Time(), unit="s", utc=True),
                end=pd.to_datetime(hourly.TimeEnd(), unit="s", utc=True),
                freq=pd.Timedelta(seconds=hourly.Interval()),
                inclusive="left"
            ),
            "pm10": hourly_pm10,
            "carbon_dioxide": hourly_carbon_dioxide,
            "nitrogen_dioxide": hourly_nitrogen_dioxide,
            "dust": hourly_dust
        }

        hourly_dataframe = pd.DataFrame(data=hourly_data)

        # Convert target_datetime to UTC
        target_datetime_utc = pd.to_datetime(target_datetime, utc=True)

        # Find the row where the date is exactly equal to target_datetime_utc
        target_row = hourly_dataframe.loc[
            hourly_dataframe["date"] == target_datetime_utc
        ]

        if not target_row.empty:
            # If an exact match is found, extract the values for air quality parameters
            current_values = {
                "pm10": target_row["pm10"].values[0],
                "carbon_dioxide": target_row["carbon_dioxide"].values[0],
                "nitrogen_dioxide": target_row["nitrogen_dioxide"].values[0],
                "dust": target_row["dust"].values[0]
            }
        else:
            print("Target datetime not found in the data.")
            return None

        return current_values
    
    async def get_weather_and_air_quality(self, latitude, longitude, target_datetime):
        """Get weather and air quality data for a location"""
        weather_data = await self.fetch_weather_data(latitude, longitude, target_datetime)
        air_quality_data = await self.fetch_air_quality_data(latitude, longitude, target_datetime)

        air_quality_data = {key: float(value) for key, value in air_quality_data.items()}
        weather_data = float(weather_data)

        return weather_data, air_quality_data
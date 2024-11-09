# AIr - AI-powered Asthma Companion 🌬️💡

## Overview 🌍

**AIr** is an intelligent asthma companion designed to help asthma patients proactively manage their condition. Leveraging machine learning 🤖, real-time environmental data 🌱, and personalized insights, AIr provides risk assessments, alerts 🚨, and actionable recommendations to help users avoid asthma triggers and live a healthier, more confident life.

### Inspiration 💭

As one of the 25 million Americans living with asthma, our team understands the mental burden of wondering if the next location, weather change, or air quality shift might trigger an attack. Asthma causes 1.6 million emergency room visits annually in the US alone. This inspired us to create a solution that uses AI to predict asthma attacks based on environmental factors, giving users the information they need to stay protected while confidently exploring life. 🌟

## Features ⚙️

- **Tracks & Learns** 📊: 
  - Users can log asthma episodes along with location information 📍.
  - AIr automatically tracks environmental data like air quality (PM10), weather (temperature 🌡️), CO, and NO2 to identify personal asthma triggers.
  - The machine learning model learns from each data point, improving predictions over time based on a user’s unique asthma profile.

- **Predicts & Alerts** 🔔:
  - AIr analyzes real-time environmental data against the user’s location and provides personalized risk alerts ⚠️.
  - If you’re heading to a park during high pollen season 🌼 or to a city with poor air quality 🌫️, you’ll receive notifications before you go.

- **Empowers & Prevents** 💪:
  - Provides actionable insights and recommendations to help users make informed decisions about daily activities 🏃 and travel plans ✈️.
  - Instead of reacting to asthma attacks, users can take preventive measures based on predicted risks.

## Tech Stack 🛠️

- **Frontend**: 
  - Built using **React Native** with **Tamagui**, offering a smooth, native mobile experience across iOS 🍏 and Android 🤖.

- **Backend**:
  - Powered by **FastAPI**, chosen for its high performance and easy integration with the machine learning pipeline ⚡.
  
- **Machine Learning**:
  - Predictive models are built with **scikit-learn**, processing user-specific asthma data alongside environmental factors to generate personalized risk assessments 📈.

- **Real-time Data**:
  - **Firebase** handles real-time data synchronization and user authentication 🔑, ensuring users always have access to the latest predictions and alerts.

- **Environmental Data**:
  - **Open-Meteo API** provides real-time weather 🌤️ and air quality 🌬️ data, such as temperature 🌡️, PM10, CO, NO2, and dust concentrations for risk prediction.

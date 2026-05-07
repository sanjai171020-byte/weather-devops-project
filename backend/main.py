from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests
import urllib3

urllib3.disable_warnings()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Weather API Running"}

@app.get("/weather")
def get_weather(city: str):
    geo_url = f"https://geocoding-api.open-meteo.com/v1/search?name={city}&count=1"
    geo_response = requests.get(geo_url, verify=False)
    geo_data = geo_response.json()

    results = geo_data.get("results")

    if not results:
        return {"error": "City not found"}

    latitude = results[0]["latitude"]
    longitude = results[0]["longitude"]
    city_name = results[0]["name"]
    country = results[0].get("country", "")

    weather_url = (
        f"https://api.open-meteo.com/v1/forecast?"
        f"latitude={latitude}&longitude={longitude}"
        f"&daily=temperature_2m_max,temperature_2m_min"
        f"&timezone=auto"
    )

    weather_response = requests.get(weather_url, verify=False)
    weather_data = weather_response.json()

    daily = weather_data["daily"]

    forecast = []

    for i in range(5):
        forecast.append({
            "date": daily["time"][i],
            "max_temp": daily["temperature_2m_max"][i],
            "min_temp": daily["temperature_2m_min"][i]
        })

    return {
        "city": city_name,
        "country": country,
        "forecast": forecast
    }
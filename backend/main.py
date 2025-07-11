from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
from datetime import date

app = FastAPI()

# Allow all origins for development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Sample data
CITIES = [
    "New York", "London", "Paris", "Tokyo", "Sydney",
    "Dubai", "Singapore", "Rome", "Barcelona", "Istanbul"
]

HOTELS = {
    "New York": ["Grand NYC Hotel", "Central Park Inn", "Empire Suites"],
    "London": ["Royal London Hotel", "Thames View Inn", "Buckingham Suites"],
    "Paris": ["Eiffel Hotel", "Louvre Palace", "Seine River Inn"],
    "Tokyo": ["Shinjuku Stay", "Tokyo Tower Hotel", "Sakura Inn"],
    "Sydney": ["Opera House Hotel", "Harbour View Inn", "Bondi Beach Suites"],
    "Dubai": ["Burj Al Arab Hotel", "Palm Resort", "Desert Oasis Inn"],
    "Singapore": ["Marina Bay Hotel", "Sentosa Suites", "Orchard Inn"],
    "Rome": ["Colosseum Hotel", "Vatican View Inn", "Roman Holiday Suites"],
    "Barcelona": ["Sagrada Familia Hotel", "Barceloneta Inn", "Gothic Quarter Suites"],
    "Istanbul": ["Blue Mosque Hotel", "Hagia Sophia Inn", "Bosphorus Suites"]
}

@app.get("/destination")
def get_destinations() -> List[str]:
    return CITIES

@app.get("/searchResults")
def get_hotels(
    city: str = Query(..., description="City name"),
    from_date: Optional[date] = Query(None, description="From date"),
    to_date: Optional[date] = Query(None, description="To date")
):
    # In a real app, you'd filter hotels based on city and date availability
    hotels = HOTELS.get(city, [])
    # Sample images for demonstration
    sample_images = [
        "https://unsplash.com/photos/two-chairs-sitting-in-front-of-a-swimming-pool-k_My4rXk4Lc",
        "https://unsplash.com/photos/a-large-swimming-pool-surrounded-by-palm-trees-_pPHgeHz1uk",
        "https://unsplash.com/photos/brown-wooden-table-and-chairs-on-brown-wooden-deck-near-body-of-water-during-daytime-TAgGZWz6Qg8"
    ]
    return [
        {
            "name": h,
            "city": city,
            "available_from": from_date,
            "available_to": to_date,
            "image_url": sample_images[i % len(sample_images)]
        }
        for i, h in enumerate(hotels)
    ]

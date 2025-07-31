from flask import Flask, render_template, request, jsonify
import requests
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)

# Get OpenWeatherMap API key from .env file
# Make sure you have a .env file in the same directory as this script
# with a line like: WEATHER_API_KEY=your_openweathermap_api_key_here
OPENWEATHER_API_KEY = os.getenv("WEATHER_API_KEY")

@app.route('/')
def index():
    """Renders the main HTML page."""
    return render_template("index.html")

@app.route('/get-weather', methods=['POST'])
def get_weather():
    """
    Fetches weather data from OpenWeatherMap API based on provided latitude and longitude.
    Expects a JSON payload with 'lat' and 'lon'.
    """
    data = request.get_json()
    lat = data.get('lat')
    lon = data.get('lon')

    if not lat or not lon:
        return jsonify({"error": "Missing coordinates"}), 400

    # OpenWeatherMap API URL for current weather
    url = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={OPENWEATHER_API_KEY}&units=metric"
    
    try:
        response = requests.get(url)
        response.raise_for_status()  # This will raise an HTTPError for bad responses (4xx or 5xx)
    except requests.exceptions.RequestException as e:
        print(f"Error fetching weather: {e}")
        return jsonify({"error": "Failed to connect to weather API"}), 500

    weather_data = response.json()

    # Extract relevant data and handle potential missing keys
    location_name = weather_data.get("name", "Unknown Location")
    
    # Use .get() with default values to prevent KeyError
    main_data = weather_data.get("main", {})
    temperature = main_data.get("temp", "--")
    
    weather_info = weather_data.get("weather", [])
    if weather_info:
        description = weather_info[0].get("description", "N/A")
        icon = weather_info[0].get("icon", "01d")
    else:
        description = "N/A"
        icon = "01d"

    timezone_offset = weather_data.get("timezone", 0) # timezone is in seconds from UTC

    return jsonify({
        "location": location_name,
        "temperature": temperature,
        "description": description,
        "icon": icon,
        "timezone_offset": timezone_offset
    })

@app.route('/about')
def about():
    """Renders the about page."""
    return render_template("about.html")

@app.route('/contact')
def contact():
    """Renders the contact page."""
    return render_template("contact.html")

if __name__ == '__main__':
    app.run(debug=True)
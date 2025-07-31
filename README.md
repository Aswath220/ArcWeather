# 🌍 ArcWeather

**ArcWeather** is an interactive, full-stack web application that allows users to select any location on the world map and view the current **weather**, **temperature**, and **local time**, with a toggleable **dark/light mode** interface.  
Built as part of the **Hack With India** contest organized by the **FEDF Department, KLH Bachupally**.

---

## 🔧 Tech Stack

### 🌐 Frontend
- **HTML5, CSS3, JavaScript (ES6)**
- **Leaflet.js** – for the interactive world map
- **OpenWeatherMap API** – for live weather data
- **Responsive UI** – dark/light mode toggle, sleek animations

### 🐍 Backend
- **Python 3**
- **Flask** – lightweight web framework
- **Requests** – for fetching weather data via APIs

### 🛠️ Tools & Utilities
- **JSON** – API data parsing
- **Canvas API** – for analog + digital clock rendering
- **LocalStorage** – for theme persistence
- **Jinja2** – template rendering with Flask
- **Environment Variables** – for securely managing API keys
- **Git & GitHub** – for version control and collaboration

---

## ⚙️ How It Works

1. User clicks on a location on the interactive world map.
2. The app captures the latitude and longitude of that point.
3. A POST request is sent to the Flask backend with the coordinates.
4. Flask queries the OpenWeatherMap API for weather data at that location.
5. The JSON response includes:
   - Temperature
   - Weather description & icon
   - Timezone offset
   - Location name
6. The frontend updates in real-time to show:
   - Local **weather condition** with icon
   - Current **temperature**
   - A **digital & analog clock** synced to the selected location
7. The theme can be toggled using a smooth light/dark switch, and preferences are saved using `localStorage`.

---

## 💡 What We Learned

During this project, we explored and integrated multiple frontend and backend technologies, including:

- Working with **Leaflet.js** for map interactivity  
- Using **OpenWeatherMap API** for real-time weather retrieval  
- Structuring and parsing **JSON** data  
- Making and handling **asynchronous API calls**  
- Designing a clean **responsive UI** with dark/light theming  
- Connecting **Python Flask** with JavaScript frontend logic  
- Using **canvas-based drawing** to create analog clocks  
- Managing **.env files** and securely handling API keys  
- Utilizing **Jinja templating** with Flask for HTML rendering  
- Organizing modular code for scalability

Additionally, we:
- 💡 Learned how to leverage **Generative AI** to comment, debug, and improve code efficiently
- 📦 Gained experience with **Python modules**, Flask routing, and static file management
- 📃About Mit License

---

## 📁 Project Structure

```
ArcWeather/
├── static/
│   ├── style.css
│   ├── about.css
│   ├── script.js
│   └── logo.png
├── templates/
│   ├── index.html
│   ├── about.html
│   └── contact.html
├── app.py
├── .env
├── test.py
└── README.md
```


---

## 🚀 Getting Started

### 1. Clone this repo
```bash
git clone https://github.com/yourusername/arcweather.git
cd arcweather
```

### 2. Install dependencies
```bash
pip install flask python-dotenv requests
```

### 3. Create `.env` file
```bash
# .env
OPENWEATHER_API_KEY=your_api_key_here
```

### 4. Run the app
```bash
python app.py
```

---

## 👨‍💻 Contributors

- **Surisetty Aswath Nag**  
  [GitHub](https://github.com/Aswath220) | [LinkedIn](https://www.linkedin.com/in/surisetty-aswath-nag-226170344)

- **Rohan Dharmesh Joshi**  
  [GitHub](https://github.com/rrohan-joshi) | [LinkedIn](https://www.linkedin.com/in/rohan-joshi-463ab5347/)

---

## 🔐 Disclaimer

API key is securely stored in `.env`. Be sure **not to commit your `.env` file** to version control.

---

## 📄 License

MIT License – feel free to fork, improve, and build on top of this project!

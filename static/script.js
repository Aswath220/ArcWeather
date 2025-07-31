window.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const toggle = document.getElementById("themeToggle");

    if (toggle) {
        // Apply stored theme
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme === "light") {
            body.classList.add("light-mode");
            toggle.checked = true;
        }

        toggle.addEventListener("change", () => {
            body.classList.toggle("light-mode");
            const newTheme = body.classList.contains("light-mode") ? "light" : "dark";
            localStorage.setItem("theme", newTheme);
        });
    }

    // Setup Leaflet map
    const map = L.map("map").setView([20, 0], 2);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
    }).addTo(map);

    const coordsText = document.getElementById("coords");
    const locationText = document.getElementById("location");
    const tempText = document.getElementById("temperature");
    const digitalTime = document.getElementById("digitalTime");
    const weatherCardsContainer = document.getElementById("weather-cards-container");

    let offset = 0;
    let debounce = false;

    map.on("click", (e) => {
        if (debounce) return;
        debounce = true;

        setTimeout(() => debounce = false, 600);

        const lat = e.latlng.lat.toFixed(5);
        const lon = e.latlng.lng.toFixed(5);
        coordsText.textContent = `Lat: ${lat}, Lon: ${lon}`;

        fetch("/get-weather", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ lat, lon })
        })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                locationText.textContent = "Error getting data";
                tempText.textContent = "--";
                return;
            }

            locationText.textContent = data.location || "Unknown";
            tempText.textContent = `${data.temperature} °C`;
            offset = data.timezone_offset || 0;

            addWeatherCard(data);
        })
        .catch(() => {
            locationText.textContent = "Network Error";
            tempText.textContent = "--";
        });
    });

    function addWeatherCard(weatherData) {
        const card = document.createElement("div");
        card.classList.add("weather-card");

        const now = new Date();
        const utcTime = now.getTime() + (now.getTimezoneOffset() * 60 * 1000);
        const localTime = new Date(utcTime + (weatherData.timezone_offset * 1000));
        const formattedTime = localTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        const iconUrl = `https://openweathermap.org/img/wn/${weatherData.icon || '01d'}@2x.png`;

        card.innerHTML = `
            <button class="remove-card" title="Remove card">&times;</button>
            <img src="${iconUrl}" alt="${weatherData.description}" class="weather-icon" />
            <div class="city-info">
                <h3>${weatherData.location}</h3>
                <p class="time">Local Time: ${formattedTime}</p>
            </div>
            <p class="temperature">${weatherData.temperature}°C</p>
        `;

        card.querySelector(".remove-card").addEventListener("click", () => card.remove());
        weatherCardsContainer.prepend(card);
    }

    // CLOCK SETUP
    const canvas = document.getElementById("clockCanvas");
    const ctx = canvas.getContext("2d");
    const radius = canvas.height / 2;
    ctx.translate(radius, radius);

    function drawClock() {
        ctx.clearRect(-radius, -radius, canvas.width, canvas.height);
        drawFace(ctx, radius);
        drawTime(ctx, radius);
    }

    function drawFace(ctx, radius) {
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, 2 * Math.PI);
        ctx.fillStyle = "#1d2b3a";
        ctx.fill();
        ctx.lineWidth = 4;
        ctx.strokeStyle = "#ccc";
        ctx.stroke();
    }

    function drawTime(ctx, radius) {
        const now = new Date();
        const local = new Date(now.getTime() + offset * 1000);

        let hour = local.getUTCHours();
        let minute = local.getUTCMinutes();
        let second = local.getUTCSeconds();

        const digital = [hour, minute, second].map(v => String(v).padStart(2, '0')).join(":");
        digitalTime.textContent = digital;

        hour = hour % 12;
        hour = (hour * Math.PI) / 6 + (minute * Math.PI) / (6 * 60);
        drawHand(ctx, hour, radius * 0.5, 6);

        minute = (minute * Math.PI) / 30 + (second * Math.PI) / (30 * 60);
        drawHand(ctx, minute, radius * 0.7, 4);

        second = (second * Math.PI) / 30;
        drawHand(ctx, second, radius * 0.9, 2, "red");
    }

    function drawHand(ctx, pos, length, width, color = "white") {
        ctx.beginPath();
        ctx.lineWidth = width;
        ctx.lineCap = "round";
        ctx.strokeStyle = color;
        ctx.moveTo(0, 0);
        ctx.rotate(pos);
        ctx.lineTo(0, -length);
        ctx.stroke();
        ctx.rotate(-pos);
    }

    setInterval(drawClock, 1000);
});

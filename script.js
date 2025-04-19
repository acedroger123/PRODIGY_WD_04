const apiKey = "cb12e5af0564485396091839251904"; 

function getWeatherByCity() {
  const city = document.getElementById("cityInput").value;
  if (!city) return alert("Please enter a city name.");
  const encodedCity = encodeURIComponent(city);
  fetchWeather(`q=${encodedCity}`);
}

function getWeatherByLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        fetchWeather(`q=${lat},${lon}`);
      },
      () => {
        alert("Unable to retrieve your location.");
      }
    );
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function fetchWeather(query) {
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&${query}&aqi=no`;
  console.log("Fetching weather with URL:", url);

  fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log("Weather API response:", data);
      displayWeather(data);
    })
    .catch(() => alert("Failed to retrieve weather data."));
}

function displayWeather(data) {
  if (data.error) {
    document.getElementById("weatherInfo").innerHTML = "City not found.";
    return;
  }

  const html = `
    <h2>${data.location.name}, ${data.location.country}</h2>
    <p><strong>${data.current.condition.text}</strong></p>
    <p>🌡️ Temp: ${data.current.temp_c}°C</p>
    <p>💨 Wind: ${data.current.wind_kph} km/h</p>
    <p>💧 Humidity: ${data.current.humidity}%</p>
  `;

  document.getElementById("weatherInfo").innerHTML = html;
}

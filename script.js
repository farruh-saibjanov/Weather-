let city_name = "Namangan";
const API_KEY = "c3c9c768278b6b9833809629a4069609";
const UNIT = "metric";
const lang = "ru";

async function getData() {
  const API_URL_ENDPOINT = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&units=${UNIT}&q=${city_name}&lang=${lang}`;

  try {
    const response = await fetch(API_URL_ENDPOINT);
    const data = await response.json();
    console.log("Weather Data:", data);

    const cityName = document.getElementById("city-name");
    const weather = document.getElementById("weather");
    const iconImg = document.getElementsByTagName("img")[0];
    const mainfeelslike = document.getElementById("main.feels_like");
    const clouds = document.getElementById("clouds")
    

    if (data.cod === "404") {
      if (cityName) {
        cityName.innerHTML = `<h1>City not found!</h1>`;
      }
      return;
    }

    if (cityName) {
      cityName.innerHTML = `<h1>${data.name}</h1>`;
    }

    if (weather) {
      weather.innerHTML = `<h2>${data.weather[0].description}</h2>
      <p>🌡 ${data.main.temp}°C</p>
      <p>💧 Humidity: ${data.main.humidity}%</p>
      <p>🌬 Wind speed: ${data.wind.speed} km/h</p>
      <p> Main feels: ${data.main.feels_like}</p>
      <p> Clouds: ${data.clouds.all}</p>`
    }

    if (iconImg) {
      const icon = data.weather[0].icon;
      iconImg.setAttribute("src", `https://openweathermap.org/img/wn/${icon}@2x.png`);
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

function changeCity() {
  const input = document.getElementById("search-input");
  if (input && input instanceof HTMLInputElement) {
    city_name = input.value;
    getData();
  }
}

getData();

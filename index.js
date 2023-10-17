let now = new Date();

function liveDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let currentDate = `${day}, ${hours}:${minutes}`;
  return currentDate;
}

let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = liveDate(now);

function updateCity(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#input-city");
  let currentCity = document.querySelector("#current-city");

  let city = inputCity.value.toLowerCase().trim();
  currentCity.innerHTML = city;
  let apiKey = "06e98a2911ef49c817729e9fe56cf740";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayWeather);
}

function displayWeather(response) {
  let currentTemp = Math.round(response.data.main.temp);
  let currentCondition = response.data.weather[0].description;
  let currentHumidity = response.data.main.humidity;
  let currentWind = Math.round(response.data.wind.speed);
  let currentFeelsTemp = Math.round(response.data.main.feels_like);
  let displayTemp = document.querySelector("#current-temperature");
  let displayCondition = document.querySelector("#sky-condition");
  let displayHumidity = document.querySelector("#humidity");
  let displayWind = document.querySelector("#wind");
  let displayFeelsTemp = document.querySelector("#feels-like");
  displayTemp.innerHTML = currentTemp;
  displayCondition.innerHTML = currentCondition;
  displayHumidity.innerHTML = currentHumidity;
  displayWind.innerHTML = currentWind;
  displayFeelsTemp.innerHTML = currentFeelsTemp;
}
let userCity = document.querySelector("#user-city");
userCity.addEventListener("submit", updateCity);

function displayCurrentGeoWeather(response) {
  let currentLocation = response.data.name;
  let displayLocation = document.querySelector("#current-city");
  displayLocation.innerHTML = currentLocation;
  let currentTemp = Math.round(response.data.main.temp);
  let currentCondition = response.data.weather[0].description;
  let currentHumidity = response.data.main.humidity;
  let currentWind = Math.round(response.data.wind.speed);
  let currentFeelsTemp = Math.round(response.data.main.feels_like);
  let displayTemp = document.querySelector("#current-temperature");
  let displayCondition = document.querySelector("#sky-condition");
  let displayHumidity = document.querySelector("#humidity");
  let displayWind = document.querySelector("#wind");
  let displayFeelsTemp = document.querySelector("#feels-like");
  displayTemp.innerHTML = currentTemp;
  displayCondition.innerHTML = currentCondition;
  displayHumidity.innerHTML = currentHumidity;
  displayWind.innerHTML = currentWind;
  displayFeelsTemp.innerHTML = currentFeelsTemp;
}

function searchLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "06e98a2911ef49c817729e9fe56cf740";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayCurrentGeoWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentLocation);

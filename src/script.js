let now = new Date();

let dateTime = document.querySelector("#date-time");

let hours = now.getHours().toString().padStart(2, "0");
let minutes = now.getMinutes().toString().padStart(2, "0");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
let day = days[now.getDay()];

dateTime.innerHTML = `${day} | ${hours}:${minutes}h`;

let currentCity = "";

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-city-input");

  setCityName(searchInput.value);

  showCurrentTemperature(searchInput.value, "metric");
}

function setCityName(city) {
  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = city;
  currentCity = city;
}
let form = document.querySelector("#search-form");

form.addEventListener("submit", search);

let apiKey = "4b3740ee7f69ae28c1197f4e97a1acc7";

function showCurrentTemperature(city, unit) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;

  axios.get(apiUrl).then(showTemperature);
}

let currentTempMain = document.querySelector("#current-temperature");
let degrees = "C";

function showTemperature(response) {
  console.log(response.data.main.temp);

  let temperature = Math.round(response.data.main.temp);
  currentTempMain.innerHTML = `${temperature}°${degrees}`;
}

let radioButton1 = document.querySelector("#btnradio1");
let radioButton2 = document.querySelector("#btnradio2");

function changeTemperatureC(event) {
  degrees = "C";
  showCurrentTemperature(currentCity, "metric");
}

radioButton1.addEventListener("change", changeTemperatureC);

function changeTemperatureF(event) {
  degrees = "F";
  showCurrentTemperature(currentCity, "imperial");
}
radioButton2.addEventListener("change", changeTemperatureF);

let currentLocation = document.querySelector("#current-location-button");
currentLocation.addEventListener("click", getPosition);

function getPosition() {
  navigator.geolocation.getCurrentPosition(getCurrentLocation);
}

function getCurrentLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayCurrentCity);
}

function displayCurrentCity(response) {
  setCityName(response.data.name);
  showTemperature(response);
}

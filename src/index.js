let now = new Date();
let dayAndHour = document.querySelector(".city-hour");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

dayAndHour.innerHTML = `${day}, ${hour}:${minutes} hours`;

function showWeather(response) {
  let cityName = document.querySelector("#searched-city");
  cityName.innerHTML = response.data.name;
  let currentCityTemp = document.querySelector("#todays-temperature");
  celsiusTemperature = response.data.main.temp;
  currentCityTemp.innerHTML = Math.round(celsiusTemperature);
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function citySearch(event) {
  event.preventDefault();
  let input = document.querySelector(".form-control");
  let citySearched = document.querySelector("#searched-city");
  citySearched.innerHTML = `${input.value}`;
  search(input.value);
}

function search(city) {
  let apiKey = "5c5df4d7dda74f566375f7ab7cc86495";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function showPosition(position) {
  let apiKey = "5c5df4d7dda74f566375f7ab7cc86495";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showFarenheintTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#todays-temperature");
  let farenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(farenheitTemperature);
}

/*function showCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#todays-temperature");
  temperatureElement.innerHTML = celsiusTemperature;
}*/

let form = document.querySelector("form");
form.addEventListener("submit", citySearch);

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentPosition);

let celsiusTemperature = null;

let farenheitLink = document.querySelector("#farenheit-link");
farenheitLink.addEventListener("click", showFarenheintTemperature);

/*let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);*/

search("Cancun");

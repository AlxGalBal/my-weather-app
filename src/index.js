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
  currentCityTemp.innerHTML = Math.round(response.data.main.temp);
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHtml = response.data.main.humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHtml = Math.round(response.data.wind.speed);
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
let form = document.querySelector("form");
form.addEventListener("submit", citySearch);

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

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentPosition);

search("Cancun");

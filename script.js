const apiKey = '77cd5822c60502f870e49a8006a58235'; // Replace with your actual API key
const apiUrl = 'https://api.openweathermap.org/data/2.5';

const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const currentLocationButton = document.getElementById('current-location-button');

const tempElement = document.getElementById('temp');
const tempUnitElement = document.getElementById('temp-unit');
const weatherIconElement = document.getElementById('weather-icon');
const weatherDescriptionElement = document.getElementById('weather-description');
const dateElement = document.getElementById('date');
const locationElement = document.getElementById('location');

const pm25Element = document.getElementById('pm25');
const so2Element = document.getElementById('so2');
const no2Element = document.getElementById('no2');
const o3Element = document.getElementById('o3');
const sunriseElement = document.getElementById('sunrise');
const sunsetElement = document.getElementById('sunset');

const humidityElement = document.getElementById('humidity');
const pressureElement = document.getElementById('pressure');
const visibilityElement = document.getElementById('visibility');
const feelsLikeElement = document.getElementById('feels-like');

const day1DateElement = document.getElementById('day1-date');
const day1DayElement = document.getElementById('day1-day');
const day1IconElement = document.getElementById('day1-icon');
const day1TempElement = document.getElementById('day1-temp');
const day2DateElement = document.getElementById('day2-date');
const day2DayElement = document.getElementById('day2-day');
const day2IconElement = document.getElementById('day2-icon');
const day2TempElement = document.getElementById('day2-temp');
const day3DateElement = document.getElementById('day3-date');
const day3DayElement = document.getElementById('day3-day');
const day3IconElement = document.getElementById('day3-icon');
const day3TempElement = document.getElementById('day3-temp');
const day4DateElement = document.getElementById('day4-date');
const day4DayElement = document.getElementById('day4-day');
const day4IconElement = document.getElementById('day4-icon');
const day4TempElement = document.getElementById('day4-temp');
const day5DateElement = document.getElementById('day5-date');
const day5DayElement = document.getElementById('day5-day');
const day5IconElement = document.getElementById('day5-icon');
const day5TempElement = document.getElementById('day5-temp');

const hour0TimeElement = document.getElementById('hour-0-time');
const hour0IconElement = document.getElementById('hour-0-icon');
const hour0TempElement = document.getElementById('hour-0-temp');
const hour1TimeElement = document.getElementById('hour-1-time');
const hour1IconElement = document.getElementById('hour-1-icon');
const hour1TempElement = document.getElementById('hour-1-temp');
const hour2TimeElement = document.getElementById('hour-2-time');
const hour2IconElement = document.getElementById('hour-2-icon');
const hour2TempElement = document.getElementById('hour-2-temp');
const hour3TimeElement = document.getElementById('hour-3-time');
const hour3IconElement = document.getElementById('hour-3-icon');
const hour3TempElement = document.getElementById('hour-3-temp');
const hour4TimeElement = document.getElementById('hour-4-time');
const hour4IconElement = document.getElementById('hour-4-icon');
const hour4TempElement = document.getElementById('hour-4-temp');
const hour5TimeElement = document.getElementById('hour-5-time');
const hour5IconElement = document.getElementById('hour-5-icon');
const hour5TempElement = document.getElementById('hour-5-temp');
const hour6TimeElement = document.getElementById('hour-6-time');
const hour6IconElement = document.getElementById('hour-6-icon');
const hour6TempElement = document.getElementById('hour-6-temp');
const hour7TimeElement = document.getElementById('hour-7-time');
const hour7IconElement = document.getElementById('hour-7-icon');
const hour7TempElement = document.getElementById('hour-7-temp');
const hour8TimeElement = document.getElementById('hour-8-time');
const hour8IconElement = document.getElementById('hour-8-icon');
const hour8TempElement = document.getElementById('hour-8-temp');

const prevDayButton = document.getElementById('prev-day');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const nextDayButton = document.getElementById('next-day');
const currentTimeElement = document.getElementById('current-time');
const totalTimeElement = document.getElementById('total-time');
const demoButton = document.getElementById('demo-button');

let currentLocation = null;
let currentWeatherData = null;
let forecastData = null;
let hourlyData = null;
let demoMode = false;
let demoIndex = 0;

// Get weather data for a specific location
function getWeatherData(location) {
    fetch(`${apiUrl}/weather?q=${location}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            currentWeatherData = data;
            updateCurrentWeather();
        })
        .catch(error => console.error(error));
}

// Get forecast data for a specific location
function getForecastData(location) {
    fetch(`${apiUrl}/forecast?q=${location}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            forecastData = data;
            updateForecast();
        })
        .catch(error => console.error(error));
}

// Get hourly forecast data for a specific location
function getHourlyData(location) {
    fetch(`${apiUrl}/forecast?q=${location}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            hourlyData = data;
            updateHourlyForecast();
        })
        .catch(error => console.error(error));
}

// Update current weather UI
function updateCurrentWeather() {
    if (currentWeatherData) {
        tempElement.textContent = Math.round(currentWeatherData.main.temp);
        weatherIconElement.src = `http://openweathermap.org/img/wn/${currentWeatherData.weather[0].icon}@2x.png`;
        weatherDescriptionElement.textContent = currentWeatherData.weather[0].description;
        dateElement.textContent = formatDate(new Date());
        locationElement.textContent = currentWeatherData.name;

        pm25Element.textContent = '-'; // Air quality data not available in OpenWeatherMap API
        so2Element.textContent = '-';
        no2Element.textContent = '-';
        o3Element.textContent = '-';
        sunriseElement.textContent = formatTime(new Date(currentWeatherData.sys.sunrise * 1000));
        sunsetElement.textContent = formatTime(new Date(currentWeatherData.sys.sunset * 1000));

        humidityElement.textContent = `${currentWeatherData.main.humidity}%`;
        pressureElement.textContent = `${currentWeatherData.main.pressure} hPa`;
        visibilityElement.textContent = `${currentWeatherData.visibility / 1000} km`;
        feelsLikeElement.textContent = `${Math.round(currentWeatherData.main.feels_like)}°C`;
    }
}

// Update forecast UI
function updateForecast() {
    if (forecastData) {
        // Update 5-day forecast
        for (let i = 0; i < 5; i++) {
            const forecastDate = new Date(forecastData.list[i * 8].dt * 1000);
            const forecastDay = daysOfWeek[forecastDate.getDay()];
            const forecastTemp = Math.round(forecastData.list[i * 8].main.temp);
            const forecastIcon = forecastData.list[i * 8].weather[0].icon;

            switch (i) {
                case 0:
                    day1DateElement.textContent = formatDate(forecastDate);
                    day1DayElement.textContent = forecastDay;
                    day1IconElement.src = `http://openweathermap.org/img/wn/${forecastIcon}@2x.png`;
                    day1TempElement.textContent = forecastTemp;
                    break;
                case 1:
                    day2DateElement.textContent = formatDate(forecastDate);
                    day2DayElement.textContent = forecastDay;
                    day2IconElement.src = `http://openweathermap.org/img/wn/${forecastIcon}@2x.png`;
                    day2TempElement.textContent = forecastTemp;
                    break;
                case 2:
                    day3DateElement.textContent = formatDate(forecastDate);
                    day3DayElement.textContent = forecastDay;
                    day3IconElement.src = `http://openweathermap.org/img/wn/${forecastIcon}@2x.png`;
                    day3TempElement.textContent = forecastTemp;
                    break;
                case 3:
                    day4DateElement.textContent = formatDate(forecastDate);
                    day4DayElement.textContent = forecastDay;
                    day4IconElement.src = `http://openweathermap.org/img/wn/${forecastIcon}@2x.png`;
                    day4TempElement.textContent = forecastTemp;
                    break;
                case 4:
                    day5DateElement.textContent = formatDate(forecastDate);
                    day5DayElement.textContent = forecastDay;
                    day5IconElement.src = `http://openweathermap.org/img/wn/${forecastIcon}@2x.png`;
                    day5TempElement.textContent = forecastTemp;
                    break;
            }
        }
    }
}

// Update hourly forecast UI
function updateHourlyForecast() {
    if (hourlyData) {
        // Update hourly forecast
        for (let i = 0; i < 9; i++) {
            const hourlyTime = new Date(hourlyData.list[i].dt * 1000);
            const hourlyTemp = Math.round(hourlyData.list[i].main.temp);
            const hourlyIcon = hourlyData.list[i].weather[0].icon;

            switch (i) {
                case 0:
                    hour0TimeElement.textContent = formatTime(hourlyTime);
                    hour0IconElement.src = `http://openweathermap.org/img/wn/${hourlyIcon}@2x.png`;
                    hour0TempElement.textContent = hourlyTemp;
                    break;
                case 1:
                    hour1TimeElement.textContent = formatTime(hourlyTime);
                    hour1IconElement.src = `http://openweathermap.org/img/wn/${hourlyIcon}@2x.png`;
                    hour1TempElement.textContent = hourlyTemp;
                    break;
                case 2:
                    hour2TimeElement.textContent = formatTime(hourlyTime);
                    hour2IconElement.src = `http://openweathermap.org/img/wn/${hourlyIcon}@2x.png`;
                    hour2TempElement.textContent = hourlyTemp;
                    break;
                case 3:
                    hour3TimeElement.textContent = formatTime(hourlyTime);
                    hour3IconElement.src = `http://openweathermap.org/img/wn/${hourlyIcon}@2x.png`;
                    hour3TempElement.textContent = hourlyTemp;
                    break;
                case 4:
                    hour4TimeElement.textContent = formatTime(hourlyTime);
                    hour4IconElement.src = `http://openweathermap.org/img/wn/${hourlyIcon}@2x.png`;
                    hour4TempElement.textContent = hourlyTemp;
                    break;
                case 5:
                    hour5TimeElement.textContent = formatTime(hourlyTime);
                    hour5IconElement.src = `http://openweathermap.org/img/wn/${hourlyIcon}@2x.png`;
                    hour5TempElement.textContent = hourlyTemp;
                    break;
                case 6:
                    hour6TimeElement.textContent = formatTime(hourlyTime);
                    hour6IconElement.src = `http://openweathermap.org/img/wn/${hourlyIcon}@2x.png`;
                    hour6TempElement.textContent = hourlyTemp;
                    break;
                case 7:
                    hour7TimeElement.textContent = formatTime(hourlyTime);
                    hour7IconElement.src = `http://openweathermap.org/img/wn/${hourlyIcon}@2x.png`;
                    hour7TempElement.textContent = hourlyTemp;
                    break;
                case 8:
                    hour8TimeElement.textContent = formatTime(hourlyTime);
                    hour8IconElement.src = `http://openweathermap.org/img/wn/${hourlyIcon}@2x.png`;
                    hour8TempElement.textContent = hourlyTemp;
                    break;
            }
        }
    }
}

// Format date
function formatDate(date) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Format time
function formatTime(date) {
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    return date.toLocaleTimeString('en-US', options);
}

// Get user's current location
function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            currentLocation = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            };
            getWeatherDataByCoordinates();
        }, error => {
            console.error('Error getting location:', error);
        });
    } else {
        console.error('Geolocation is not supported by this browser.');
    }
}

// Get weather data by coordinates
function getWeatherDataByCoordinates() {
    fetch(`${apiUrl}/weather?lat=${currentLocation.latitude}&lon=${currentLocation.longitude}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            currentWeatherData = data;
            updateCurrentWeather();
        })
        .catch(error => console.error(error));
}

// Search button click handler
searchButton.addEventListener('click', () => {
    const location = searchInput.value;
    if (location) {
        getWeatherData(location);
        getForecastData(location);
    }
}
)

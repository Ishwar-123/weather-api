// OpenWeather API key
const apiKey = '41ec2eb09552bd5222566a3e340a791a';

// Function to fetch and display weather data
function getWeather() {
    const inputValue = document.getElementById('cityInput');
    const weatherInfo = document.getElementById('weatherDisplay');
    const errorMessage = document.getElementById('errorMessage');

    // Clear previous results
    weatherInfo.classList.remove('active');
    errorMessage.style.display = 'none';

    // Check if input is empty
    if (!inputValue.value) {
        showError('Please enter a city name');
        return;
    }

    // Construct API request URL
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + inputValue.value + "&units=metric&appid=" + apiKey;

    // Fetch weather data from API
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found. Please check spelling and try again.');
            }
            return response.json();
        })
        .then(data => {
            // Set current date
            const dateElement = document.getElementById('currentDate');
            const currentDate = new Date().toLocaleDateString();
            dateElement.textContent = currentDate;

            // Display weather information
            document.getElementById('cityName').textContent = `${data.name}, ${data.sys.country}`;
            document.getElementById('weatherCondition').textContent = `${data.weather[0].description}`;
            document.getElementById('temperature').textContent = `${Math.round(data.main.temp)}`;
            document.getElementById('humidity').textContent = `${data.main.humidity}`;
            document.getElementById('feelsLike').textContent = `${Math.round(data.main.feels_like)}`;
            document.getElementById('pressure').textContent = `${data.main.pressure}`;
            document.getElementById('windSpeed').textContent = `${Math.round(data.wind.speed * 3.6)}`; // Convert m/s to km/h

            // Set weather icon based on weather condition code
            const weatherIconElement = document.getElementById('weatherIcon');
            const iconCode = data.weather[0].icon;
            weatherIconElement.innerHTML = `<img src="https://openweathermap.org/img/wn/${iconCode}@2x.png" alt="${data.weather[0].description}">`;

            // Show weather info
            weatherInfo.classList.add('active');
        })
        .catch(error => {
            showError(error.message);
        });
}

// Function to display error messages
function showError(message) {
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}

// Add event listener for "Enter" key press to trigger search
document.getElementById('cityInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        getWeather();
    }
});
    

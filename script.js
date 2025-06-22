document.addEventListener("DOMContentLoaded", function() {
    const API_key = "cd210460aeb56354fd13bf8911d788b6";
    const cityInput = document.querySelector(".inputForm");
    const btnForm = document.querySelector(".btnForm");
    const errorMessage = document.querySelector("#errorMessage");
    const weatherResult = document.querySelector("#weatherResult");
    const details = document.querySelector(".details");
    
    errorMessage.style.display = "none";
    weatherResult.style.display = "none";
    btnForm.addEventListener("click", function() {
        let city = cityInput.value.trim();
        
        if (city) {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}`;
            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        errorMessage.style.display = "block";
                        weatherResult.style.display = "none";
                        errorMessage.textContent = "City not found. Please enter a valid city name.";
                        cityInput.value = ""; // Clear the input field
                        cityInput.style.border = "2px solid red"; // Change border color to red 
                        throw new Error("City not found. Please enter a valid city name.");
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const cityName = data.name;
                    const country = data.sys.country;
                    const weatherDescription = data.weather[0].description;
                    const temperature = Math.round(data.main.temp - 273.15); // Convert from Kelvin to Celsius
                    weatherResult.style.display = "block";
                    errorMessage.style.display = "none";
                    document.querySelector(".cityName").textContent = `City Name:- ${cityName}, ${country}`;
                    document.querySelector(".weatherDescription").textContent = `Weather Description:- ${weatherDescription}`;
                    document.querySelector(".temperature").textContent = `Temperature:- ${temperature} °C`;
                    details.addEventListener("click", function() {
                        details.style.display = "none";
                        const latitude = data.coord.lat;
                        const longitude = data.coord.lon;
                        const grnd_level = data.main.grnd_level;
                        const humidity = data.main.humidity;
                        const pressure = data.main.pressure;
                        const sea_level = data.main.sea_level;
                        const degree = data.wind.deg;
                        const speed = data.wind.speed;
                        document.querySelector(".latitude").textContent = `Latitude:- ${latitude} °`;
                        document.querySelector(".longitude").textContent = `Longitude:- ${longitude} °`;
                        document.querySelector(".grnd_level").textContent = `Ground Level:- ${grnd_level} m`;
                        document.querySelector(".humidity").textContent = `Humidity:- ${humidity} %`;
                        document.querySelector(".pressure").textContent = `Pressure:- ${pressure} hPa`;
                        document.querySelector(".sea_level").textContent = `Sea Level:- ${sea_level} m`;
                        document.querySelector(".degree").textContent = `Wind Degree:- ${degree} °`;
                        document.querySelector(".speed").textContent = `Wind Speed:- ${speed} m/s`;
                    });
                })
                .catch(error => {
                    console.error("Error:", error);
                });
                
        } else {
            errorMessage.style.display = "block";
            weatherResult.style.display = "none";
            errorMessage.textContent = "Please enter a city name.";
            cityInput.style.border = "2px solid red"; // Change border color to red
            cityInput.value = ""; // Clear the input field
        }
    });
    cityInput.addEventListener("input", function() {
        errorMessage.style.display = "none";
        weatherResult.style.display = "none";
        cityInput.style.border = ""; // Reset border color
        
    });
    

});
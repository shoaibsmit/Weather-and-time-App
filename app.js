

document.getElementById('cityForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const cityName = document.getElementById('cityInput').value;
    getWeather(cityName);
    getTime(cityName);
});

async function getWeather(city) {
    const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === 200) {
            document.getElementById('weather').innerText = `Temperature: ${data.main.temp}°C, ${data.weather[0].description}`;
        } else {
            document.getElementById('weather').innerText = 'City not found';
        }

        document.getElementById('result').style.display = 'block';
    } catch (error) {
        document.getElementById('weather').innerText = 'Error fetching weather data';
        document.getElementById('result').style.display = 'block';
    }
}

async function getTime(city) {
    const url = `https://worldtimeapi.org/api/timezone`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const timezones = data.filter(zone => zone.toLowerCase().includes(city.toLowerCase()));
        
        if (timezones.length > 0) {
            const timezoneUrl = `https://worldtimeapi.org/api/timezone/${timezones[0]}`;
            const timezoneResponse = await fetch(timezoneUrl);
            const timezoneData = await timezoneResponse.json();
            document.getElementById('time').innerText = timezoneData.datetime;
        } else {
            document.getElementById('time').innerText = 'Time not found for this city';
        }

        document.getElementById('result').style.display = 'block';
    } catch (error) {
        document.getElementById('time').innerText = 'Error fetching time data';
        document.getElementById('result').style.display = 'block';
    }
}

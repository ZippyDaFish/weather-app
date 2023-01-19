async function getWeatherData(city, unit){
    const response = await fetch('http://api.openweathermap.org/data/2.5/weather?q='+city+'&units='+unit+'&APPID=1bc93ee0ee0d4cdd8fd91c4abca090f2');
    const weatherData = await response.json();
    console.log(weatherData);
    assignWeatherData(weatherData);
}

function assignWeatherData(weatherData){
    let tempFeelsLike = weatherData.main.feels_like;
    let temp = weatherData.main.temp;
    let humidity = weatherData.main.humidity;
    let windSpeed = weatherData.wind.speed;
    let cloudCover = weatherData.weather[0].description;
}
getWeatherData('Lansing', 'metric');
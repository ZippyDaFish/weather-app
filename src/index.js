async function getWeatherData(){
    const response = await fetch('http://api.openweathermap.org/data/2.5/weather?q=London,uk&units=metric&APPID=1bc93ee0ee0d4cdd8fd91c4abca090f2');
    const weatherData = await response.json();
    console.log(weatherData);
}
getWeatherData();
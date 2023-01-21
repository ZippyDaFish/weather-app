async function getWeatherData(city, unit){
    const response = await fetch('http://api.openweathermap.org/data/2.5/weather?q='+city+'&units='+unit+'&APPID=1bc93ee0ee0d4cdd8fd91c4abca090f2');
    const weatherData = await response.json();
    weatherToday = assignWeatherData(weatherData);
    console.log(weatherToday);
    displayWeatherToday(weatherToday);
}
function assignWeatherData(weatherData){
    weatherToday = {};
    weatherToday["feelsLike"] = weatherData.main.feels_like;
    weatherToday["temp"] = weatherData.main.temp;
    weatherToday["humidity"] = weatherData.main.humidity;
    weatherToday["wind"] = weatherData.wind.speed;
    weatherToday["icon"] = fetchIconImage(weatherData.weather[0].icon);
    weatherToday["desc"] = weatherData.weather[0].description;
    return weatherToday;
}

async function getForecastData(city, unit){
    const response = await fetch('http://api.openweathermap.org/data/2.5/forecast?q='+city+'&units='+unit+'&APPID=1bc93ee0ee0d4cdd8fd91c4abca090f2');
    const forecastData = await response.json();
    assignForecastData(forecastData.list);
}
function assignForecastData(forecastDataList){
    let dataInDays = [];
    for(i = 5; i < forecastDataList.length; i += 8){
        day = extractUsefulForecastData(forecastDataList[i]);
        dataInDays.push(day);
    }
    console.log(dataInDays);
    displayForecast(dataInDays);
}
function extractUsefulForecastData(day){
    dayData = {};
    dayData["date"] = day.dt_txt;
    dayData["pop"] = day.pop * 100;
    dayData["icon"] = fetchIconImage(day.weather[0].icon);
    dayData["temp"] = day.main.temp;
    return dayData;
}

function fetchIconImage(iconCode){
    icon = 'http://openweathermap.org/img/wn/'+iconCode+'@2x.png';
    return icon;
}

function displayWeatherToday(weather){
    document.getElementById('feels-like').innerText = weather.feelsLike;
    document.getElementById('temp').innerText = weather.temp;
    document.getElementById('humidity').innerText = weather.humidity;
    document.getElementById('wind').innerText = weather.wind;
    document.getElementById('icon').src = weather.icon;
    document.getElementById('description').innerText = weather.desc;
}
function displayForecast(forecast){
    console.log("Displaying Forecast")
}

function getData(location, unit){
    getWeatherData(location, unit);
    getForecastData(location, unit);
}

function validateLocationInput(){
    let locationInput = document.getElementById('location-input');
    const location = locationInput.value;
    locationInput.value = "";
    getData(location, 'metric');
}

document.getElementById('location-submit').addEventListener('click', function(){ validateLocationInput(); });

getData('London', 'metric');
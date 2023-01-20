async function getWeatherData(city, unit){
    const response = await fetch('http://api.openweathermap.org/data/2.5/weather?q='+city+'&units='+unit+'&APPID=1bc93ee0ee0d4cdd8fd91c4abca090f2');
    const weatherData = await response.json();
    weatherToday = assignWeatherData(weatherData);
    console.log(weatherToday);
}
function assignWeatherData(weatherData){
    weatherToday = {};
    weatherToday["feelsLike"] = weatherData.main.feels_like;
    weatherToday["temp"] = weatherData.main.temp;
    weatherToday["humidity"] = weatherData.main.humidity;
    weatherToday["wind"] = weatherData.wind.speed;
    weatherToday["icon"] = weatherData.weather[0].icon;
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
}
function extractUsefulForecastData(day){
    dayData = {};
    dayData["date"] = day.dt_txt;
    dayData["pop"] = day.pop * 100;
    dayData["icon"] = day.weather[0].icon;
    dayData["temp"] = day.main.temp;
    return dayData;
}

getWeatherData('Lansing', 'metric');
getForecastData('Lansing', 'metric');
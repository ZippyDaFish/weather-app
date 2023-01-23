async function getWeatherData(location, unit){
    const response = await fetch('http://api.openweathermap.org/data/2.5/weather?q='+location+'&units='+unit+'&APPID=1bc93ee0ee0d4cdd8fd91c4abca090f2');
    const weatherData = await response.json();
    weatherToday = assignWeatherData(weatherData);
    displayWeatherToday(weatherToday, location);
}
function assignWeatherData(weatherData){
    weatherToday = {};
    weatherToday["feelsLike"] = weatherData.main.feels_like;
    weatherToday["temp"] = weatherData.main.temp;
    weatherToday["humidity"] = weatherData.main.humidity;
    weatherToday["wind"] = weatherData.wind.speed;
    weatherToday["icon"] = fetchIconImage(weatherData.weather[0].icon);
    weatherToday["desc"] = capitalizeWords(weatherData.weather[0].description);
    return weatherToday;
}

async function getForecastData(location, unit){
    const response = await fetch('http://api.openweathermap.org/data/2.5/forecast?q='+location+'&units='+unit+'&APPID=1bc93ee0ee0d4cdd8fd91c4abca090f2');
    const forecastData = await response.json();
    forecast = assignForecastData(forecastData.list);
    console.log(forecast)
    displayForecast(forecast);
}
function assignForecastData(forecastDataList){
    let dataInDays = [];
    for(i = 5; i < forecastDataList.length; i += 8){
        day = extractUsefulForecastData(forecastDataList[i]);
        dataInDays.push(day);
    }
    return dataInDays;
}
function extractUsefulForecastData(day){
    dayData = {};
    dayData["date"] = sliceDate(day.dt_txt);
    dayData["pop"] = (day.pop * 100).toString() + "%";
    dayData["icon"] = fetchIconImage(day.weather[0].icon);
    dayData["temp"] = day.main.temp.toString() + "C";
    return dayData;
}

function fetchIconImage(iconCode){
    icon = 'http://openweathermap.org/img/wn/'+iconCode+'@2x.png';
    return icon;
}
function sliceDate(date){
    date = date.toString();
    slicedDate = date.slice(6);
    finalDate = slicedDate.split(' ');
    return finalDate[0];
}
function capitalizeWords(sentence){
    let words = sentence.split(" ");
    for(let i = 0; i < words.length; i++){
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }
    finalSentence = words.join(" ");
    return finalSentence;
}

function displayWeatherToday(weather, location){
    document.getElementById('feels-like').innerText = "Feels Like " + weather.feelsLike.toString() + "C";
    document.getElementById('temp').innerText = "Temp " + weather.temp.toString() + "C";
    document.getElementById('humidity').innerText = "Humidity " + weather.humidity;
    document.getElementById('wind').innerText = "Wind " + weather.wind;
    document.getElementById('description').innerText = weather.desc;
    document.getElementById('icon').src = weather.icon;
    document.getElementById('location-display').innerText = location;
}
function displayForecast(forecast){
    const forecastDiv = document.getElementById('forecast');
    forecastDiv.innerHTML = "";
    for(i = 0; i < forecast.length; i++){
        const forecastCard = document.createElement('div');
        forecastCard.classList.add('forecast-card', 'flex-column');
        forecastDiv.appendChild(forecastCard);
        
        const dateDisplay = document.createElement('p');
        dateDisplay.innerText = forecast[i].date;
        const popDisplay = document.createElement('p');
        popDisplay.innerText = forecast[i].pop;
        const iconDisplay =document.createElement('img');
        iconDisplay.src = forecast[i].icon;
        const tempDisplay = document.createElement('p');
        tempDisplay.innerText = forecast[i].temp;

        forecastCard.appendChild(dateDisplay);
        forecastCard.appendChild(popDisplay);
        forecastCard.appendChild(iconDisplay);
        forecastCard.appendChild(tempDisplay);
    }
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
(()=>{function a(a){return dayData={},dayData.date=a.dt_txt,dayData.pop=100*a.pop,dayData.icon=e(a.weather[0].icon),dayData.temp=a.main.temp,dayData}function e(a){return icon="http://openweathermap.org/img/wn/"+a+"@2x.png",icon}!async function(a,t){const n=await fetch("http://api.openweathermap.org/data/2.5/weather?q=Lansing&units=metric&APPID=1bc93ee0ee0d4cdd8fd91c4abca090f2"),i=await n.json();weatherToday=function(a){return weatherToday={},weatherToday.feelsLike=a.main.feels_like,weatherToday.temp=a.main.temp,weatherToday.humidity=a.main.humidity,weatherToday.wind=a.wind.speed,weatherToday.icon=e(a.weather[0].icon),weatherToday.desc=a.weather[0].description,weatherToday}(i),console.log(weatherToday)}(),async function(e,t){const n=await fetch("http://api.openweathermap.org/data/2.5/forecast?q=Lansing&units=metric&APPID=1bc93ee0ee0d4cdd8fd91c4abca090f2");!function(e){let t=[];for(i=5;i<e.length;i+=8)day=a(e[i]),t.push(day);console.log(t)}((await n.json()).list)}()})();
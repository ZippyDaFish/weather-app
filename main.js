!async function(e,t){const a=await fetch("http://api.openweathermap.org/data/2.5/weather?q=Lansing&units=metric&APPID=1bc93ee0ee0d4cdd8fd91c4abca090f2"),n=await a.json();console.log(n),function(e){e.main.feels_like,e.main.temp,e.main.humidity,e.wind.speed,e.weather[0].description}(n)}(),async function(e,t){const a=await fetch("http://api.openweathermap.org/data/2.5/forecast?q=Lansing&units=metric&APPID=1bc93ee0ee0d4cdd8fd91c4abca090f2"),n=await a.json();console.log(n),function(e){let t=[];for(t.push(e[0]),i=5;i<e.length;i+=8)t.push(e[i]);console.log(t)}(n.list)}();
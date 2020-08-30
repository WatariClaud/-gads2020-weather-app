if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
    .then((reg) => {
    // registration worked
        console.log('Registration succeeded. Scope is ' + reg.scope);
    }).catch((error) => {
    // registration failed
        console.log('Registration failed with ' + error);
    });
}

document.querySelector('#date-year').textContent = new Date().getFullYear();
const res =  document.querySelector('#res');
const resContent =  document.querySelector('#res-content');
const cityName =  document.querySelector('#city-title');
const searchBox = document.querySelector('#userquery');
const searchBtn = document.querySelector('#search-btn');
const resLoader = document.querySelector('#load-container');
const cityTitle = document.querySelector('#city-title strong');
const cityContent = document.querySelector('#city-content strong');
const weatherContent = document.querySelector('#weather-content');
const tempContentHi = document.querySelector('#temp-content-hi');
const tempContentLow = document.querySelector('#temp-content-low');
const atmTitle = document.querySelector('#atm-title strong');
const atmContent = document.querySelector('#atm-content');

const loadRes = () => {
    resContent.classList.remove('hidden')
    resLoader.classList.add('hidden');
}
const loadEvent = () => {
   setTimeout(loadRes, 1500);
}
window.addEventListener('load', loadEvent);
const getCurrentWeatherDefault = () => {
    fetch('http://ip-api.com/json')
    .then((r) => r.json())
    .then((r) =>{
         console.log(r);
         fetch(`http://api.openweathermap.org/data/2.5/weather?q=${r.city}&APPID=503ddc3764a990cdaff00121f6840069`)
         .then(result => result.json())
         .then((r) => {
             console.log(r);
            cityContent.textContent = `${r.name}, ${r.sys.country}`;
            weatherContent.textContent = r.weather[0].main;
            tempContentHi.textContent = `${r.main.temp_max}°`;
            tempContentLow.textContent = `${r.main.temp_min}°`;
            if(r.rain) atmTitle.textContent = 'Rain',atmContent.textContent = `${r.rain['1h']}`;
            if(r.wind) atmTitle.textContent = 'Wind',atmContent.textContent = `${r.wind['speed']}`;
         })
    })
    .catch((e) => console.log(e));
}
getCurrentWeatherDefault();

const showRes = (event) => {
    event.preventDefault();
    resContent.classList.add('hidden')
    resLoader.classList.remove('hidden');
    
    setTimeout(loadEvent, 500);
    let cityQuery;
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${searchBox.value}&APPID=503ddc3764a990cdaff00121f6840069`)
    .then(result => result.json())
    .then(result => {
        console.log(result);
        cityQuery = result.name;
        cityTitle.textContent = 'Result for:'
        cityContent.textContent = `${cityQuery}, ${result.sys.country}`;
        weatherContent.textContent = result.weather[0].main;
        tempContentHi.textContent = `${result.main.temp_max}°`;
        tempContentLow.textContent = `${result.main.temp_min}°`;
        if(result.rain) atmTitle.textContent = 'Rain',atmContent.textContent = `${result.rain['1h']}`;
        if(result.wind) atmTitle.textContent = 'Wind',atmContent.textContent = `${result.wind['speed']}`;
    })
    .catch(err => console.log(err));
}
searchBtn.addEventListener('click', showRes);

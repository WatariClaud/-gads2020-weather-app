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
const searchResultsArray = [];
const res =  document.querySelector('#res');
const resContent =  document.querySelector('#res-content');
const cityName =  document.querySelector('#city-title');
const searchBox = document.querySelector('#userquery');
const searchBtn = document.querySelector('#search-btn');
const resLoader = document.querySelector('#load-container');
const cityTitle = document.querySelector('#city-title strong');
const cityContent = document.querySelector('#city-content');
const weatherContent = document.querySelector('#weather-content');
const tempContent = document.querySelector('#temp-content');
const atmTitle = document.querySelector('#atm-title strong');
const atmContent = document.querySelector('#atm-content');
const humidityContent = document.querySelector('#humidity-content');
const descriptionContent = document.querySelector('#description-content');
const locationsList = document.querySelector('#locations');
const exitRes = document.querySelector('.exit-btn');
const menu = document.querySelector('#menu');
const menuContent = document.querySelector('#menu-content');

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
         fetch(`http://api.openweathermap.org/data/2.5/weather?q=${r.city}&units=metric&APPID=503ddc3764a990cdaff00121f6840069`)
         .then(result => result.json())
         .then((r) => {
            cityContent.textContent = `${r.name}, ${r.sys.country}`;
            weatherContent.textContent = r.weather[0].main;
            tempContent.textContent = `${r.main.temp}°C`;
            humidityContent.textContent = `${r.main.humidity}%`;
            descriptionContent.textContent = `${r.weather[0].description}`;
            // tempContentLow.textContent = `${r.main.temp_min}°C`;
            if(r.rain) atmTitle.textContent = 'Rain:', atmContent.textContent = `${r.rain['1h']} mm`;
            if(r.wind) atmTitle.textContent = 'Wind:', atmContent.textContent = `${r.wind['speed']} m/s`;
         })
    })
    .catch((e) => console.log(e));
}
const getListOfLocations = () => {
    fetch('https://raw.githubusercontent.com/samayo/country-json/master/src/country-by-capital-city.json')
    .then((l) => l.json())
    .then((l) => {
        l.forEach(location => {
            locationsList.innerHTML += `<option value = '${location.city}'>${location.country}'</option>`
        });
    })
}
getCurrentWeatherDefault();
getListOfLocations();

const showRes = (event) => {
    event.preventDefault();
    if(searchBox.value === '' || !searchBox.value) return searchBox.classList.add('err'), searchBox.focus(), false;
    res.style.display = 'block';
    resContent.classList.add('hidden')
    resLoader.classList.remove('hidden');
    
    setTimeout(loadEvent, 500);
    let cityQuery;
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${searchBox.value}&units=metric&APPID=503ddc3764a990cdaff00121f6840069`)
    .then(result => result.json())
    .then(result => {
        cityQuery = result.name;
        cityTitle.textContent = 'Result for:'
        cityContent.textContent = `${cityQuery}, ${result.sys.country}`;
        weatherContent.textContent = result.weather[0].main;
        tempContent.textContent = `${result.main.temp}°C`;
        humidityContent.textContent = `${result.main.humidity}%`;
        descriptionContent.textContent = `${result.weather[0].description}`;
        // tempContentLow.textContent = `${result.main.temp_min}°C`;
        if(result.rain) atmTitle.textContent = 'Rain:',atmContent.textContent = `${result.rain['1h']} mm`;
        if(result.wind) atmTitle.textContent = 'Wind:',atmContent.textContent = `${result.wind['speed']} m/s`;
    })
    .catch(err => console.log(err));
}
searchBtn.addEventListener('click', showRes);

const hideRes = () => {
    res.style.display = 'none';
}

exitRes.addEventListener('click', hideRes);

const toggleMenu = () => {
    res.style.display = 'none';

    const isOpen = menuContent.classList.contains('slide-in');

    menuContent.classList.remove("h");

    menuContent.setAttribute('class', isOpen ? 'slide-out' : 'slide-in');
}

menu.addEventListener('click', toggleMenu);

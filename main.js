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
let searchResultsArray;
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
const userSearchListBox = document.querySelector('#user-search-list');

const userQueriesList = localStorage.getItem('userQueries');
const userQueriesListParsed = JSON.parse(userQueriesList);

const loadRes = () => {
    resContent.classList.remove('hidden')
    resLoader.classList.add('hidden');
}
const loadEvent = () => {
   setTimeout(loadRes, 1500);
}
window.addEventListener('load', loadEvent);

const checkEmptyList = () => {
    if(userQueriesList) {
        if(userQueriesListParsed.length > 0) searchResultsArray = userQueriesListParsed;
        else searchResultsArray = [];
    } else {
        menuContent.innerHTML = `<p><br><br>Your search history appears here.<br><br>You don't have any searches yet.</p>`;
        searchResultsArray = [];
    }
};

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

const showRecentList = () => {
    if(userQueriesListParsed && userQueriesListParsed.length > 0) {
        return userQueriesListParsed.reverse().forEach((listItem) => {
            if(listItem.hasOwnProperty('wind')) {
                userSearchListBox.innerHTML += `
                <li>
                    <h4>${listItem.name}, ${listItem.sys.country}</h4>
                    <p><strong>Weather condition:</strong> ${listItem.weather[0].main}</p>
                    <p><strong>Temperature:</strong> ${listItem.main.temp}°C</p>
                    <p><strong>Wind:</strong> ${listItem.main.temp}°C</p>
                    <p><strong>Humidity:</strong> ${listItem.main.humidity}%</p>
                    <p><strong>Description:</strong> ${listItem.weather[0].description}</p>
                </li>`;
            } else if(listItem.hasOwnProperty('rain')) {
                userSearchListBox.innerHTML += `
                <li>
                    <h4>${listItem.name}, ${listItem.sys.country}</h4>
                    <p><strong>Weather condition:</strong> ${listItem.weather[0].main}</p>
                    <p><strong>Temperature:</strong> ${listItem.main.temp}°C</p>
                    <p><strong>Rain:</strong> ${listItem.main.temp}mm</p>
                    <p><strong>Humidity:</strong> ${listItem.main.humidity}%</p>
                    <p><strong>Description:</strong> ${listItem.weather[0].description}</p>
                </li>`;
            }
        });
    }
};

showRecentList();

const showRes = (event) => {
    event.preventDefault();
    checkEmptyList();
    if(searchBox.value === '' || !searchBox.value) return searchBox.classList.add('err'), searchBox.focus(), false;
    res.style.display = 'block';
    resContent.classList.add('hidden')
    resLoader.classList.remove('hidden');
    
    setTimeout(loadEvent, 500);
    let cityQuery;
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${searchBox.value}&units=metric&APPID=503ddc3764a990cdaff00121f6840069`)
    .then(result => result.json())
    .then(result => {
        searchResultsArray.push(result);
        localStorage.setItem('userQueries', JSON.stringify(searchResultsArray));
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
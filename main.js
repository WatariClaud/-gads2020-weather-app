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
const cityName =  document.querySelector('#city-title');
const searchBox = document.querySelector('#inputbox');
const searchBtn = document.querySelector('#search-btn');
const resLoader = document.querySelector('#load-container');

const showRes = () => {

}

searchBtn.addEventListener('click', showRes);

document.querySelector('#date-year').textContent = new Date().getFullYear();
const cityName =  document.querySelector('#city-title');
const searchBox = document.querySelector('#inputbox');
const searchBtn = document.querySelector('#search-btn');
const resLoader = document.querySelector('#load-container');

const showRes = () => {

}

searchBtn.addEventListener('click', showRes);

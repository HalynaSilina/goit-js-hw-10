import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;
const countryNameInput = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

countryNameInput.addEventListener(
  'input',
  debounce(handleSearchCountryInput, DEBOUNCE_DELAY)
);

function handleSearchCountryInput(e) {
  const countryName = e.target.value.trim();
  if (countryName === '') {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
    return;
  }
  fetchCountries(countryName).then(data => searchSpecifityCheck(data)).catch(onError);
}

function searchSpecifityCheck(data) {
  console.log(data);
  const countryAmount = data.length;
  if (countryAmount > 10) {
    return Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (countryAmount >= 2 && countryAmount <= 10) {
    countryInfo.innerHTML = '';
    countryList.innerHTML = createListOfCountries(data);
  } else {
    countryList.innerHTML = '';
    countryInfo.innerHTML = createCountryCard(data);
  }
}

function createListOfCountries(data) {
  return data
    .map(
      element =>
        `<li><img src="${element.flag}" width=60><h2>${element.name}</h2>`
    )
    .join(', ');
}

function createCountryCard(data) {
  const languages = Object.values(data[0].languages).join(', ');
  const capital = Object.values(data[0].capital).join(', ');
  return `<div class= "country-title"> <img src="${data[0].flag}" width=60><h2>${data[0].name}</h2></div><p><span>Capital: </span>${capital}</p><p><span>Population: </span>${data[0].population}</p><p><span>Languages: </span>${languages}</p>`;
}
function onError() {
  Notify.failure('Oops, there is no country with that name');
}

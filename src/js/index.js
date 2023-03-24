import '../css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';

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
  if (countryName==="") {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
    return
  }
  fetchCountries(countryName)
    .then(data => searchSpecifityCheck(data))
    .catch(error => onError(error));
}

function searchSpecifityCheck(data) {
  if (data.length > 10) {
    return Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (data.length >= 2 && data.length <= 10) {
    countryInfo.innerHTML = '';
    const markup = data
      .map(
        element =>
          `<li><img src="${element.flags.svg}" width=60><h2>${element.name.official}</h2>`
      )
      .join('');
    countryList.innerHTML = markup;
  } else {
    const languages = Object.values(data[0].languages).join(', ');
    countryList.innerHTML = '';
    countryInfo.innerHTML = `<img src="${data[0].flags.svg}" width=60><h2>${
      data[0].name.official
    }</h2><p>Capital: ${data[0].capital}</p><p>Population: ${
      data[0].population
    }</p><p>Languages: ${languages}</p>`;
  }
}
function onError(error) {
  console.error(error);
  Notify.failure('Oops, there is no country with that name');
}

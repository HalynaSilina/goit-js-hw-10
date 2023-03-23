import '../css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const countryNameInput = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

countryNameInput.addEventListener('input', debounce(handleSearchCountryInput, DEBOUNCE_DELAY));

function handleSearchCountryInput(e) {
const countryName = e.target.value;
console.log(countryName);
}

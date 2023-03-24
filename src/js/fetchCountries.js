import { Notify } from 'notiflix/build/notiflix-notify-aio';

const BASE_URL = 'https://restcountries.com/v3.1';

export function fetchCountries(name) {
return fetch(`${BASE_URL}/name/${name}`).then(response=>{
    if (!response.ok) {
        throw new Error(response.status);
    }
    return response.json();
}).then(data=>{
const countriesData = data.map(country=>({name: country.name.official,
flag: country.flags.svg,
population: country.population,
languages: Object.values(country.languages),
capital: country.capital}));
return countriesData;
}).catch(Notify.failure('Oops, there is no country with that name'));
}
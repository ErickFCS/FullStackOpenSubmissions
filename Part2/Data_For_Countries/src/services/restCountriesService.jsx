import axios from 'axios'

const fetchCountry = (name,) => (
    axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`,)
        .then((res,) => {
            return res.data
        },)
        .catch((err,) => {
            console.error(err,)
            return Promise.reject(`${name} not found`,)
        },)
)

const fetchAllCountries = () => (
    axios
        .get('https://studies.cs.helsinki.fi/restcountries/api/all',)
        .then((res,) => {
            return res.data
        },)
        .catch((err,) => {
            console.error(err,)
            return Promise.reject('Failed to fetch all countries',)
        },)
)

export default { fetchCountry, fetchAllCountries, }
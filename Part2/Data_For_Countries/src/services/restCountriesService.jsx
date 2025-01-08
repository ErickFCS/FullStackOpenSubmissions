import axios from "axios"

const fetchCountry = (name) => (
    axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
        .then((res) => {
            return res.data
        })
        .catch((err) => {
            console.error(err)
            return Promise.reject(`${name} not found`)
        })
)

const fetchAllCountrys = () => (
    axios
        .get("https://studies.cs.helsinki.fi/restcountries/api/all")
        .then((res) => {
            return res.data
        })
        .catch((err) => {
            console.error(err)
            return Promise.reject("Failed to fetch all countries")
        })
)

export default { fetchCountry, fetchAllCountrys }
import axios from "axios"

const apiKey = import.meta.env.VITE_apiKey || ""
const apiHost = import.meta.env.VITE_apiHost || ""

const fetchWeatherFromCity = (cityName) => {
    const options = {
        params: {
            place: cityName,
            cnt: '3',
            units: 'standard',
            type: 'three_hour',
            mode: 'json',
            lang: 'en'
        },
        headers: {
            'x-rapidapi-key': apiKey,
            'x-rapidapi-host': apiHost,
            Accept: 'application/json'
        }
    }
    return axios.get("https://weather-api167.p.rapidapi.com/api/weather/forecast", options)
        .then((res) => {
            return res.data
        })
        .catch((err) => { 
            console.error(err)
            return Promise.reject("Unable to fetch weather data")
        })
}

export default fetchWeatherFromCity
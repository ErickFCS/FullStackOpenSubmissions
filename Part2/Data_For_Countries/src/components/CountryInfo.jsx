import { useEffect, useState } from 'react'
import fetchWeatherFromCity from '../services/weatherApiService'

const WeatherInfo = ({ weather }) => {
    if (!weather) return null
    return (
        <>
            <h2>Weather in {weather.city.name}</h2>
            <h3>summery: {weather.list[0].summery}</h3>
            <h3>temperature: {weather.list[0].main.temprature}°Kevin</h3>
            <h3>humidity: {weather.list[0].main.humidity}%</h3>
            <h3>wind: {weather.list[0].wind.speed} m/s from {weather.list[0].wind.direction}</h3>
            <h3>description: {weather.list[0].weather[0].description}</h3>
            <img src={weather.list[0].weather[0].icon} alt="" />
        </>
    )
}

const CountryInfo = ({ info }) => {
    if (!info) return null
    const [weather, setWeather] = useState(null)

    useEffect(() => {
        fetchWeatherFromCity(info.capital[0])
            .then((res) => {
                setWeather(res)
            })
    }, [])
    console.log(info.capital[0]);


    return (
        <div>
            <h1>{info.name.common}</h1>
            <h2>{info.name.official}</h2>
            <h3>capital: {info.capital}</h3>
            <h3>area: {info.area}</h3>
            <h3>Languages: </h3>
            <ul>
                {Object.values(info.languages).map((e) => (
                    <li key={e}>{e}</li>
                ))}
            </ul>
            <img src={info.flags.png} alt={`${info.name.common} flag`} />
            <WeatherInfo weather={weather} />
        </div>
    )
}

export default CountryInfo
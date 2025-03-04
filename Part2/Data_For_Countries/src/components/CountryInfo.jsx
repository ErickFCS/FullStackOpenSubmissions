import { useEffect, useState, } from 'react'
import Card from 'react-bootstrap/Card'
import fetchWeatherFromCity from '../services/weatherApiService'
import ListGroup from 'react-bootstrap/ListGroup'
import Stack from 'react-bootstrap/Stack'
import Table from 'react-bootstrap/Table'

const WeatherInfo = ({ weather, },) => {
    if (!weather) return null
    return (
        <>
            <h2 style={{ textAlign: 'center', margin: 0, }}>Weather in {weather.city.name}</h2>
            <Stack direction='horizontal' style={{ justifyContent: 'center', }}>
                <img src={weather.list[0].weather[0].icon} alt='' />
            </Stack>
            <Table>
                <thead>
                    <tr>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Summery:</td>
                        <td>{weather.list[0].summery}</td>
                    </tr>
                    <tr>
                        <td>Temperature:</td>
                        <td>{weather.list[0].main.temperature}°Kevin</td>
                    </tr>
                    <tr>
                        <td>Humidity:</td>
                        <td>{weather.list[0].main.humidity}%</td>
                    </tr>
                    <tr>
                        <td>Wind:</td>
                        <td>{weather.list[0].wind.speed} m/s from {weather.list[0].wind.direction}</td>
                    </tr>
                    <tr>
                        <td>Description:</td>
                        <td>{weather.list[0].weather[0].description}</td>
                    </tr>
                </tbody>
            </Table>
        </>
    )
}

const CountryInfo = ({ info, },) => {
    const [weather, setWeather,] = useState(null,)

    useEffect(() => {
        if (!info) return
        fetchWeatherFromCity(info.capital[0],)
            .then((res,) => {
                setWeather(res,)
            },)
            .catch(() => { },)
    }, [info,],)

    if (!info) return null
    console.log(info.capital[0],)

    return (
        <Card style={{ maxWidth: 500, }}>
            <Card.Body>
                <Stack gap={2}>
                    <Card.Img src={info.flags.png} />
                    <Card.Title>
                        <h1 style={{ margin: 0, }}>{info.name.common}</h1>
                    </Card.Title>
                    <Table style={{ margin: 0, }}>
                        <thead>
                            <tr>
                                <th>Official Name</th>
                                <th>Capital</th>
                                <th>Area</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{info.name.official}</td>
                                <td>{info.capital}</td>
                                <td>{info.area} km<sup>2</sup></td>
                            </tr>
                        </tbody>
                    </Table>
                    <h3 style={{ margin: 0, }}>Languages:</h3>
                    <ListGroup>
                        {Object.values(info.languages,).map((e,) => (
                            <ListGroup.Item key={e}>{e}</ListGroup.Item>
                        ),)}
                    </ListGroup>
                    <WeatherInfo weather={weather} />
                </Stack>
            </Card.Body>
        </Card>
    )
}

export default CountryInfo
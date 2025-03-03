import { useState, useEffect, } from 'react'
import axios from 'axios'

const useField = (type,) => {
    const [value, setValue,] = useState('',)

    const onChange = (event,) => {
        setValue(event.target.value,)
    }

    return {
        type,
        value,
        onChange,
    }
}

const useCountry = (name,) => {
    const [country, setCountry,] = useState(null,)

    useEffect(() => {
        axios
            .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`,)
            .then((res,) => {
                setCountry({ ...res.data, found: true, },)
            },)
            .catch(() => {
                setCountry({ found: false, },)
            },)
    }, [name,],)

    return country
}

const Country = ({ country, },) => {
    if (!country) {
        return null
    }
    console.log(country.found,)
    if (!country.found) {
        return (
            <div>
                not found...
            </div>
        )
    }

    return (
        <div>
            <h1>{country.name.common}</h1>
            <h3>capital: {country.capital}</h3>
            <div>population {country.population}</div>
            <img src={country.flags.png} height='100' alt={`${country.name.common} flag`} />
        </div>
    )
}

const App = () => {
    const nameInput = useField('text',)
    const [name, setName,] = useState('',)
    const country = useCountry(name,)

    const fetch = (e,) => {
        e.preventDefault()
        setName(nameInput.value,)
    }

    return (
        <div>
            <form onSubmit={fetch}>
                <input {...nameInput} />
                <button>find</button>
            </form>

            <Country country={country} />
        </div>
    )
}

export default App
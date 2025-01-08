const CountryInfo = ({ info }) => {
    if (!info) return null
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
        </div>
    )
}

export default CountryInfo
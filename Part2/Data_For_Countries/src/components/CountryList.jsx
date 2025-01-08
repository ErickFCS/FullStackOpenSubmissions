const CountryList = ({ countries, onShow }) => {
    if (countries.length > 10) return <div>Too many matches, specify another filter</div>
    if (countries.length <= 1) return null
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Common Name</th>
                        <th>Official Name</th>
                    </tr>
                </thead>
                <tbody>
                    {countries.map(country => (
                        <tr key={`${country.name.common}`}>
                            <td key={`common_${country.name.common}`}>{country.name.common}</td>
                            <td key={`official_${country.name.official}`}>{country.name.official}</td>
                            <td>
                                <button key={`button_${country.name.common}`} onClick={() => { onShow(country.name.common) }}>Show</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default CountryList
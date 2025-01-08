import { useState, useEffect } from 'react';
import CountryInfo from './components/CountryInfo';
import CountryList from './components/CountryList';
import SearchBar from './components/SearchBar';
import restCountriesService from './services/restCountriesService';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [countries, setCountries] = useState([]);
  const [countryList, setCountryList] = useState([]);
  const [countryInfo, setCountryInfo] = useState(null);

  useEffect(() => {
    restCountriesService.fetchAllCountrys()
      .then((res) => {
        const newCountries = res.map(({ name }) => ({ name }))
        console.log(newCountries);
        setCountries(newCountries);
      })
      .catch((err) => {
        console.error(err);
        alert("Unable to fetch all countries")
      })
  }, [])

  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
    const regExp = new RegExp(`^${event.target.value}`, "i")
    const regExp2 = new RegExp(`^${event.target.value}$`, "i")
    const newCountryList = countries.filter((e) => (
      regExp.test(e.name.common)
    ))
    if (newCountryList.length < 1) {
      setCountryInfo(null)
      setCountryList(newCountryList)
    } else if (newCountryList.length == 1 || regExp2.test(newCountryList[0].name.common)) {
      setCountryList([])
      restCountriesService.fetchCountry(newCountryList[0].name.common)
        .then((res) => {
          setCountryInfo(res)
        })
    } else {
      setCountryInfo(null)
      setCountryList(newCountryList)
    }
  }

  const handleShow = (commonName) => {
    restCountriesService.fetchCountry(commonName)
      .then((res) => {
        setCountryInfo(res)
      })
  }

  return (
    <>
      <SearchBar handleSearch={handleSearch} />
      <CountryList countries={countryList} onShow={handleShow}/>
      <CountryInfo info={countryInfo} />
    </>
  )
}

export default App

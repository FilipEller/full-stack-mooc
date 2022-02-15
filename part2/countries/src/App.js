import { useState, useEffect } from 'react'
import axios from 'axios'
import DisplayCountries from './components/DisplayCountries'

function App() {
  const [query, setQuery] = useState('')
  const [countriesData, setCountriesData] = useState([])

  const countriesShown = countriesData.filter(country =>
    country.name.common.toLowerCase()
      .includes(query.toLowerCase())
  )

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(res => {
        setCountriesData(res.data)
      })
  }, [])

  console.log('rendering...')

  return (
    <div>
      <div>
        <label htmlFor="search">Find countries</label>
        <input type="text" id="search" value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>
      <DisplayCountries countries={countriesShown} setQuery={setQuery}/>
    </div>
  );
}

export default App;

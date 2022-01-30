import DisplayCountry from "./DisplayCountry"
import CountryList from "./CountryList"

const DisplayCountries = ({ countries }) => {
  const display = () => {
    if (countries.length > 10) {
      return <p>Too many matches, please specify.</p>
    } else if (countries.length > 1) {
      return <CountryList countries={countries}/>
    } else if (countries.length === 1) {
      return <DisplayCountry country={countries[0]} />
    } else {
      return <p>Nothing</p>
    }
  }

  return (
    <>
      {display()}
    </>
  )
}

export default DisplayCountries
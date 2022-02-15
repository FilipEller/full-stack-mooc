import Weather from "./Weather"

const DisplayCountry = ({country}) => {
  console.log(country)
  console.log(country.capital[0])

  return (
    <section>
      <h2>{country.name.common}</h2>
      <div>
        <p><b>Capital:</b> {country.capital[0]}</p>
      </div>
      <div>
        <p><b>Population:</b> {country.population}</p>
      </div>
      <h3>Languages</h3>
      <ul>
        {Object.values(country.languages).map(lang =>
          <li key={lang}>{lang}</li>)}
      </ul>
      <img src={country.flags.png} style={{maxWidth: "100px"}}></img>
      <Weather city={country.capital[0]} info={country.capitalInfo}/>
    </section>
  )
}

export default DisplayCountry
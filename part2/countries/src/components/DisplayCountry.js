const DisplayCountry = ({country}) => {
  console.log(country)

  return (
    <section>
      <h2>{country.name.common}</h2>
      <div>
        <p>Capital: {country.capital[0]}</p>
      </div>
      <div>
        <p>Population: {country.population}</p>
      </div>
      <h3>Languages</h3>
      <ul>
        {Object.values(country.languages).map(lang =>
          <li>{lang}</li>)}
      </ul>
      <img src={country.flags.png} style={{maxWidth: "100px"}}></img>
    </section>
  )
}

export default DisplayCountry
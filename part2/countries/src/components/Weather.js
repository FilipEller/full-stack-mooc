import { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = ({ city, info }) => {
  const [weather, setWeather] = useState({})
  const latitude = Math.floor(info.latlng[0])
  const longitude = Math.floor(info.latlng[1])

  useEffect(() => {
    axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`)
      .then(res => {
        setWeather(res.data)
      })
      .catch(error => {
        console.log(error.message)
      })
  }, [])

  return (
    <div>
      <h3>Weather in {city}</h3>
      {Object.keys(weather).length > 0 && weather.weather[0].description && <p><b>{weather.weather[0].description}</b></p>}
      {Object.keys(weather).length > 0 && weather.main.temp && <p><b>Temperature:</b> {weather.main.temp} °C</p>}
      {Object.keys(weather).length > 0 && weather.wind.speed && <p><b>Wind:</b> {weather.wind.speed} m/s</p>}
    </div>
  );
};

export default Weather;

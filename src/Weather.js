import React, { useState } from 'react';
import axios from 'axios';

import WeatherInfo from './WeatherInfo';
import WeatherForecast from './WeatherForecast';
import './Weather.css';

export default function Weather(props) {
   const [weatherData, setWeatherData] = useState({ ready: false });
   const [city, setCity] = useState(props.defaultCity);

   function handleResponse(response) {
      setWeatherData({
         ready: true,
         city: response.data.name,
         country: response.data.sys.country,
         data: new Date(response.data.dt * 1000),
         temp: response.data.main.temp,
         description: response.data.weather[0].description,
         humidity: response.data.main.humidity,
         wind: response.data.wind.speed,
         icon: response.data.weather[0].icon,
         coordinates: response.data.coord,
      });
   }

   function search() {
      const apiKey = 'ed55b36e362d8733f7d859247cedeaf2';
      let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

      axios.get(apiUrl).then(handleResponse);
   }

   function handleSubmit(event) {
      event.preventDefault();
      search();
   }

   function handleCityChange(event) {
      setCity(event.target.value);
   }

   if (weatherData.ready) {
      return (
         <div className="Weather">
            <form onSubmit={handleSubmit}>
               <div className="row">
                  <div className="col-9 SearchInput">
                     <input
                        type="search"
                        placeholder="Enter a city..."
                        autoFocus="on"
                        className="w-100 h-100 "
                        onChange={handleCityChange}
                     />
                  </div>
                  <div className="col-3 SearchBtn">
                     <input
                        type="submit"
                        value="Search"
                        className="btn btn-primary w-100 SearchBtnText"
                     />
                  </div>
               </div>
            </form>
            <WeatherInfo data={weatherData} />
            <WeatherForecast coordinates={weatherData.coordinates} />
         </div>
      );
   } else {
      search();

      return 'Loading...';
   }
}

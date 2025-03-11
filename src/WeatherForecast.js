import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherForecastDay from './WeatherForecastDay';
import './WeatherForecast.css';

export default function WeatherForecast(props) {
   const [loaded, setLoaded] = useState(false);
   const [weatherForecast, setWeatherForecast] = useState(null);

   function handleResponse(response) {
      setWeatherForecast(response.data.list);
      setLoaded(true);
   }

   function search() {
      const apiKey = 'ed55b36e362d8733f7d859247cedeaf2';
      let lat = `${props.coordinates.lat}`;
      let lon = `${props.coordinates.lon}`;
      let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

      axios.get(apiUrl).then(handleResponse);
   }

   useEffect(() => {
      setLoaded(false);
   }, [props.coordinates]);

   if (loaded) {
      return (
         <div className="WeatherForecast">
            <div className="row">
               {weatherForecast.map(function (dailyForecast, index) {
                  if (index < 5) {
                     return (
                        <div className="col ForecastDay" key={index}>
                           <WeatherForecastDay forecast={dailyForecast} />
                        </div>
                     );
                  } else {
                     return null;
                  }
               })}
            </div>
         </div>
      );
   } else {
      console.log(loaded);
      search();
      return null;
   }
}

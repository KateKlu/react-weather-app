import React from 'react';
import FormatDate from './FormatDate';
import WeatherIcon from './WeatherIcon';
import WeatherTemperature from './WeatherTemperature';

export default function WeatherInfo(props) {
   return (
      <div className="WeatherInfo">
         <h1>
            {props.data.city}, {props.data.country}
         </h1>
         <ul>
            <li>
               <FormatDate date={props.data.date} />
            </li>
            <li className="weatherDescription">{props.data.description}</li>
         </ul>
         <div className="row mt-3">
            <div className="col-8">
               <WeatherIcon code={props.data.icon} size={50} />
               <WeatherTemperature celsius={props.data.temp} />
            </div>
            <div className="col-4">
               <ul>
                  <li>Humidity: {props.data.humidity}%</li>
                  <li>Wind: {props.data.wind} m/s</li>
               </ul>
            </div>
         </div>
      </div>
   );
}

import React from "react";
import WeatherIcon from "./WeatherIcon";

export default function WeatherForecastDay(props) {
  function showDay() {
    let date = new Date(props.forecast.dt * 1000);
    let weekDay = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return `${weekDay[date.getDay()]}`;
  }

  function showMaxTemp() {
    let temperature = Math.round(props.forecast.temp.max);
    return `${temperature}°`;
  }

  function showMinTemp() {
    let temperature = Math.round(props.forecast.temp.min);
    return `${temperature}°`;
  }

  return (
    <div className="WeatherForecastDay">
      <div className="WeatherForecast-day">{showDay()}</div>
      <WeatherIcon code={props.forecast.weather[0].icon} size={30} />
      <div className="WeatherForecast-temp">
        <span className="WeatherForecast-temp-max">{showMaxTemp()}</span>
        <span className="WeatherForecast-temp-min">{showMinTemp()}</span>
      </div>
    </div>
  );
}

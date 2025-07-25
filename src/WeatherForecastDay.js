import WeatherIcon from './WeatherIcon';
import WeatherTemperature from './WeatherTemperature';

export default function WeatherForecastDay({ forecast, unit }) {
   function showDay() {
      let date = new Date(forecast.dt * 1000);
      let weekDay = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      return `${weekDay[date.getDay()]}`;
   }

   function showMaxTemp() {
      return (
         <WeatherTemperature celsius={forecast.main.temp_max} unit={unit} />
      );
   }

   function showMinTemp() {
      return (
         <WeatherTemperature celsius={forecast.main.temp_min} unit={unit} />
      );
   }

   return (
      <div className="WeatherForecastDay">
         <div className="WeatherForecast-day">{showDay()}</div>
         <WeatherIcon code={forecast.weather[0].icon} size={30} />
         <div className="WeatherForecast-temp">
            <span className="WeatherForecast-temp-max">{showMaxTemp()}° /</span>
            <span className="WeatherForecast-temp-min">{showMinTemp()}°</span>
         </div>
      </div>
   );
}

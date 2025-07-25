import FormatDate from './FormatDate';
import WeatherIcon from './WeatherIcon';
import WeatherTemperature from './WeatherTemperature';

export default function WeatherInfo({ data, unit, setUnit }) {
   const showC = (event) => {
      event.preventDefault();
      setUnit('celsius');
   };
   const showF = (event) => {
      event.preventDefault();
      setUnit('fahrenheit');
   };

   return (
      <div className="WeatherInfo">
         <h1>
            {data.city}, {data.country}
         </h1>
         <ul>
            <li>
               <FormatDate date={data.date} />
            </li>
            <li className="weatherDescription">{data.description}</li>
         </ul>
         <div className="row mt-3">
            <div className="col-8">
               <WeatherIcon code={data.icon} size={50} />
               <span className="Temperature">
                  <WeatherTemperature celsius={data.temp} unit={unit} />{' '}
               </span>
               <span className="Units">
                  {unit === 'celsius' ? (
                     <>
                        °C |{' '}
                        <a href="/" onClick={showF}>
                           °F
                        </a>
                     </>
                  ) : (
                     <>
                        <a href="/" onClick={showC}>
                           °C
                        </a>{' '}
                        | °F
                     </>
                  )}
               </span>
            </div>
            <div className="col-4">
               <ul>
                  <li>Humidity: {data.humidity}%</li>
                  <li>Wind: {data.wind} m/s</li>
               </ul>
            </div>
         </div>
      </div>
   );
}

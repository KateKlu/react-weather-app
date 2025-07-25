export default function WeatherTemperature({ celsius, unit }) {
   const value =
      unit === 'celsius'
         ? Math.round(celsius)
         : Math.round((celsius * 9) / 5 + 32);

   return <span>{value}</span>;
}

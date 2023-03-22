import React, { useState } from "react";

export default function WeatherTemperature(props) {
  const [unit, setUnit] = useState("celsius");

  function ShowFahrenheit(event) {
    event.preventDefault();
    setUnit("fahrenheit");
  }

  function ShowCelsius(event) {
    event.preventDefault();
    setUnit("celsius");
  }

  if (unit === "celsius") {
    return (
      <div className="d-inline">
        <span className="Temperature">{Math.round(props.celsius)}</span>
        <span className="Units">
          °C|{" "}
          <a href="/" onClick={ShowFahrenheit}>
            °F
          </a>
        </span>
      </div>
    );
  } else {
    return (
      <div className="d-inline">
        <span className="Temperature">
          {Math.round((props.celsius * 9) / 5 - 32)}
        </span>
        <span className="Units">
          <a href="/" onClick={ShowCelsius}>
            °C
          </a>{" "}
          | °F
        </span>
      </div>
    );
  }
}

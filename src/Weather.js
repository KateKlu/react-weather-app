import { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherInfo from './WeatherInfo';
import WeatherForecast from './WeatherForecast';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './Weather.css';

export default function Weather(props) {
   const [weatherData, setWeatherData] = useState({ ready: false });
   const [city, setCity] = useState(props.defaultCity);
   const [unit, setUnit] = useState('celsius');
   const [isLoading, setIsLoading] = useState(false);
   const [showModal, setShowModal] = useState(false);
   const [modalMsg, setModalMsg] = useState('');

   function openModal(msg) {
      setModalMsg(msg);
      setShowModal(true);
   }

   useEffect(() => {
      search(city);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   function handleResponse(response) {
      setIsLoading(false);

      setWeatherData({
         ready: true,
         city: response.data.name,
         country: response.data.sys.country,
         date: new Date(response.data.dt * 1000),
         temp: response.data.main.temp,
         description: response.data.weather[0].description,
         humidity: response.data.main.humidity,
         wind: response.data.wind.speed,
         icon: response.data.weather[0].icon,
         coordinates: response.data.coord,
      });
   }

   function search(term) {
      setIsLoading(true);
      const apiKey = process.env.REACT_APP_WEATHER_KEY;
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${term}&appid=${apiKey}&units=metric`;

      axios
         .get(apiUrl)
         .then(handleResponse)
         .catch((error) => {
            setIsLoading(false);
            if (error.response?.status === 404) {
               openModal(`City “${term}” not found. Try another.`);
               setWeatherData({ ready: false });
            } else {
               openModal('Network error. Please try again later.');
            }
         });
   }

   function handleSubmit(event) {
      event.preventDefault();
      if (!city.trim()) {
         openModal('Please enter a city name.');
         return;
      }
      search(city);
   }

   function handleCityChange(event) {
      setCity(event.target.value);
   }

   return (
      <div className="Weather">
         <form onSubmit={handleSubmit}>
            <div className="row">
               <div className="col-9 SearchInput">
                  <input
                     type="search"
                     placeholder="Enter a city..."
                     autoFocus="on"
                     defaultValue={props.defaultCity}
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

         {isLoading && <p>Loading...</p>}

         {!isLoading && weatherData.ready && (
            <>
               <WeatherInfo data={weatherData} unit={unit} setUnit={setUnit} />
               <WeatherForecast
                  coordinates={weatherData.coordinates}
                  unit={unit}
               />
            </>
         )}

         <Modal show={showModal} onHide={() => setShowModal(false)} centered>
            <Modal.Header closeButton>
               <Modal.Title>Notice</Modal.Title>
            </Modal.Header>
            <Modal.Body>{modalMsg}</Modal.Body>
            <Modal.Footer>
               <Button variant="primary" onClick={() => setShowModal(false)}>
                  OK
               </Button>
            </Modal.Footer>
         </Modal>
      </div>
   );
}

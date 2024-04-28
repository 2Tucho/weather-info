import React, { useState, useRef, useEffect } from "react";
import WeatherCard from "./WeatherCard";
import axios from "axios";

const WeatherList = () => {
  // Cambiar el "Madrid" por la geolocalización
  const [value, setValue] = useState(""); // Para guardar el dato a buscar
  const [weatherFetch, setweatherFetch] = useState([]); // Para guardar los weatherFetch
  const [cityName, setCityName] = useState(); // Para el nombre de la ciudad buscada
  const inputRef = useRef();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async function getGeolocation(position) {
      try {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude
        // Petición HTTP
        const res = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_API_KEY}&units=metric`);
        const json = res.data.list;
        setCityName(res.data.city.name) //Nombre de la ciudad por defecto

        // Guarda en el array de weatherFetch el resultado. Procesa los datos
        setweatherFetch(json);
      } catch (e) {
        setweatherFetch([]) // No pintes nada 
      }
    })

  }, [])

  // equivale a un componentDidUpdate()
  useEffect(() => {
    async function fetchData() {
      try {
        // Petición HTTP
        const res = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${value}&appid=${import.meta.env.VITE_API_KEY}&units=metric`);
        const json = res.data.list;
        setCityName(res.data.city.name)

        // Guarda en el array de weatherFetch el resultado. Procesa los datos
        setweatherFetch(json);
      } catch (e) {
        setweatherFetch([]) // No pintes nada 
      }
    }

    fetchData();
  }, [value]); // componentDidUpdate

  const handleSubmit = (e) => {
    e.preventDefault();
    setValue(inputRef.current.value) // Modificando el estado de Value
  };

  const paintCards = () => weatherFetch.map((forecast, index) => <WeatherCard
    key={index}
    date={forecast.dt_txt}
    temp={Math.round(forecast.main.temp)}
    weather={forecast.weather[0].main}
    icon={forecast.weather[0].icon}
  />);


  return <section>
    <form onSubmit={handleSubmit}>
      <input ref={inputRef} placeholder="Ciudad" />
      <button>Buscar</button>
    </form>
    <h3>{cityName}</h3>
    {paintCards()}
  </section>
};

export default WeatherList;
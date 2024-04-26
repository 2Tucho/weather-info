import React, { useState, useRef, useEffect } from "react";
import WeatherCard from "./WeatherCard";
import axios from "axios";

const WeatherList = () => {
  const [value, setValue] = useState("Madrid"); // Para guardar el dato a buscar
  const [posts, setPosts] = useState([]); // Para guardar los posts
  const inputRef = useRef();

  // equivale a un componentDidUpdate()
  useEffect(() => {
    async function fetchData() {
      try {
        // Petición HTTP
        const fetchUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${value}&appid=${import.meta.env.VITE_API_KEY}&units=metric`
        console.log(fetchUrl)
        const res = await axios.get(fetchUrl);
        const json = res.data.list;
        console.log(json[0].main.temp)

        // Guarda en el array de posts el resultado. Procesa los datos
        setPosts(json);
      } catch (e) {
        setPosts([]) // No pintes nada 
      }
    }

    fetchData();
  }, [value]); // componentDidUpdate

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputRef.current.value)
    setValue(inputRef.current.value) // Modificando el estado de Value
  };

  const paintCards = () => posts.map((forecast, index) => <WeatherCard
    key={index}
    date={forecast.dt_txt}
    temp={Math.round(forecast.main.temp)}
    weather={forecast.weather[0].main}
    icon={forecast.weather[0].icon}
  />);

  return <section>
    <form onSubmit={handleSubmit}>
      <input ref={inputRef} />
    </form>
    <h3>{value}</h3>
    {paintCards()}
  </section>
};

export default WeatherList;

//Iconos en la api del tiempo
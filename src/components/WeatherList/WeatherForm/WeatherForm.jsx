import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const WeatherForm = () => {
  const [value, setValue] = useState(""); // Para guardar el dato a buscar
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

  return <section>
    <form onSubmit={handleSubmit}>
      <input ref={inputRef}/>
    </form>
    <h3>{inputRef.current.value}</h3>
    {posts.map(forecast => 
    <article>
      <p>{forecast.dt_txt}</p>
      <p>{forecast.main.temp}</p>
    </article>
    
    )}
  </section>
};

export default WeatherForm;

import React from "react";
import "./WeatherCard.css"

function WeatherCard ({date, temp, weather, icon}) { //También se puede poner props como parámetro y en el cuerpo de la función poner props.title o lo que toque
  return (
    <article>
      <h5>{weather}</h5>
      <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt={weather} />
      <p>Fecha y hora: {date}</p>
      <p>Temperatura: <strong>{temp}ºC</strong></p>
    </article>
  )
}

export default WeatherCard;

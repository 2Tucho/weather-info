import React, { useState, useEffect } from "react";
import WeatherForm from "./WeatherForm";
import WeatherCard from "./WeatherCard";

const WeatherList = () => {
  

  return (
    <section>
      <WeatherForm/>
      <WeatherCard/>
    </section>
  );
};

export default WeatherList;

//Iconos en la api del tiempo
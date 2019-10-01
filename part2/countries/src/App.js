import React, { useState, useEffect } from "react";
import axios from "axios";

import Filter from "./components/Filter";
import Viewer from "./components/Viewer";
import Country from "./components/Country";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [newSearch, setNewSearch] = useState("");
  const [clicked, setClicked] = useState(false);
  const [country, setCountry] = useState([]);
  const [temp, setTemp] = useState(0);
  const [sky, setSky] = useState("");
  const [wind, setWind] = useState(0);

  const hookCountries = () => {
    axios.get("https://restcountries.eu/rest/v2/all").then(response => {
      setCountries(response.data);
    });
  };

  useEffect(hookCountries, []);

  const handleSearchChange = event => {
    setNewSearch(event.target.value);
    setClicked(false);
  };

  const handleClick = country => {
    setClicked(true);
    setCountry(country);
  };

  const handleSetTemp = city => {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=32bea3d9cb1625c5048bd6cee495c7d9`
      )
      .then(response => {
        const tempCurrent = (response.data.main.temp - 273.15).toFixed(1);
        const skyCurrent = response.data.weather[0].description;
        const windCurrent = response.data.wind.speed;
        setTemp(tempCurrent);
        setSky(skyCurrent);
        setWind(windCurrent);
      });

    return (
      <div>
        <h3>Weather in {city}</h3>
        <p>Temp: {temp}</p>
        <p>Sky: {sky}</p>
        <p>Wind: {wind} kph</p>
      </div>
    );
  };

  return (
    <div>
      <h1>Country Finder App</h1>
      <Filter value={newSearch} onChange={handleSearchChange} />
      <Viewer
        countries={countries}
        newSearch={newSearch}
        handleClick={handleClick}
        handleSetTemp={handleSetTemp}
      />
      {clicked ? <Country country={country} clicked={clicked} /> : <div></div>}
    </div>
  );
};

export default App;

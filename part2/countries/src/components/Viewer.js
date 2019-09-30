import React, { useState, useEffect } from "react";
import axios from "axios";

const Viewer = props => {
  const { countries, newSearch, handleClick } = props;

  // const hookWeather = () => {
  //   axios
  //     .get(
  //       `http://api.weatherstack.com/current?access_key=4d272c1b1a78a67aee5b13a0425a2640&query=${country.capital}`
  //     )
  //     .then(response => {
  //       setWeather(response.data);
  //     });
  // };

  // useEffect(hookWeather, []);

  const filteredCountries = countries.filter(country => {
    return country.name.toUpperCase().indexOf(newSearch.toUpperCase()) !== -1;
  });

  if (filteredCountries.length > 10) {
    return <p>Too many matches, specify another filter.</p>;
  } else if (filteredCountries.length <= 10 && filteredCountries.length > 1) {
    return filteredCountries.map(country => {
      return (
        <li key={country.numericCode}>
          {country.name}{" "}
          <span>
            <button onClick={() => handleClick(country)}>show</button>
          </span>
        </li>
      );
    });
  } else {
    return filteredCountries.map(country => {
      return (
        <div key={country.numericCode}>
          <h1>{country.name}</h1>
          <p>capital: {country.capital}</p>
          <p>population: {country.population}</p>
          <h3>Languages</h3>
          <ul>
            {country.languages.map((language, index) => {
              return <li key={index}>{language.name}</li>;
            })}
          </ul>
          <br />
          <img src={country.flag} alt={country.name} height="100" width="100" />
          <h2>Weather in {country.capital}</h2>
        </div>
      );
    });
  }
};

export default Viewer;

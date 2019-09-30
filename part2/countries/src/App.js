import React, { useState, useEffect } from "react";
import axios from "axios";

import Filter from "./components/Filter";
import Countries from "./components/Countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [newSearch, setNewSearch] = useState("");

  const hook = () => {
    axios.get("https://restcountries.eu/rest/v2/all").then(response => {
      console.log("response", response.data);
      setCountries(response.data);
    });
  };

  useEffect(hook, []);

  const handleSearchChange = event => {
    setNewSearch(event.target.value);
  };

  const rows = () => {
    const filteredCountries = countries.filter(country => {
      return country.name.toUpperCase().indexOf(newSearch.toUpperCase()) !== -1;
    });

    if (filteredCountries.length > 10) {
      return <p>Too many matches, specify another filter.</p>;
    } else if (filteredCountries.length <= 10 && filteredCountries.length > 1) {
      return filteredCountries.map(country => {
        return <li key={country.numericCode}>{country.name}</li>;
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
              {country.languages.map(language => {
                return <li key={country.numericCode}>{language.name}</li>;
              })}
            </ul>
            <br />
            <img
              src={country.flag}
              alt={country.name}
              height="100"
              width="100"
            />
          </div>
        );
      });
    }
  };

  return (
    <div>
      <h1>Country Finder App</h1>
      <Filter value={newSearch} onChange={handleSearchChange} />
      <Countries rows={rows()} />
    </div>
  );
};

export default App;

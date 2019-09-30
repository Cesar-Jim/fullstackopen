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

  const hook = () => {
    axios.get("https://restcountries.eu/rest/v2/all").then(response => {
      setCountries(response.data);
    });
  };

  useEffect(hook, []);

  const handleSearchChange = event => {
    setNewSearch(event.target.value);
    setClicked(false);
  };

  const handleClick = country => {
    setClicked(true);
    setCountry(country);
  };

  return (
    <div>
      <h1>Country Finder App</h1>
      <Filter value={newSearch} onChange={handleSearchChange} />
      <Viewer
        countries={countries}
        newSearch={newSearch}
        handleClick={handleClick}
      />
      {clicked ? <Country country={country} clicked={clicked} /> : <div></div>}
    </div>
  );
};

export default App;

import React from "react";

const Viewer = props => {
  const { countries, newSearch, handleClick, handleSetTemp } = props;

  const filteredCountries = countries.filter(country => {
    return country.name.toUpperCase().indexOf(newSearch.toUpperCase()) !== -1;
  });

  // More than 10 occurencies
  if (filteredCountries.length > 10) {
    return <p>Too many matches, specify another filter.</p>;
  }

  // Between 10 and 2 occurencies
  if (filteredCountries.length <= 10 && filteredCountries.length > 1) {
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
  }

  // Only one occurency
  if (filteredCountries.length === 1) {
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
          <img src={country.flag} alt={country.name} height="150" width="300" />
          {country ? (
            handleSetTemp(country.capital)
          ) : (
            <h1>More than one country</h1>
          )}
        </div>
      );
    });
  }

  // Default render
  return <div></div>;
};

export default Viewer;

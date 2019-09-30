import React from "react";

const Country = props => {
  const { country } = props;

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
    </div>
  );
};

export default Country;

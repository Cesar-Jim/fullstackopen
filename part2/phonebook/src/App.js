import React, { useState, useEffect } from "react";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

import axios from "axios";

const App = () => {
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newSearch, setNewSearch] = useState("");
  const [persons, setPersons] = useState([]);

  const hook = () => {
    axios.get("http://localhost:3001/persons").then(response => {
      setPersons(response.data);
    });
  };

  useEffect(hook, []);

  const addPerson = event => {
    event.preventDefault();

    const personObject = {
      name: newName,
      number: newPhone
    };

    const nameExists = persons.find(personObject => {
      return personObject.name === newName;
    });

    if (nameExists) {
      alert(`${newName} is already added to phoneBook.`);
    } else {
      axios
        .post(`http://localhost:3001/persons`, personObject)
        .then(response => {
          console.log(response);
        });
      setPersons(persons.concat(personObject));
      setNewName("");
      setNewPhone("");
    }
  };

  const handleNameChange = event => {
    setNewName(event.target.value);
  };

  const handlePhoneChange = event => {
    setNewPhone(event.target.value);
  };

  const handleSearchChange = event => {
    setNewSearch(event.target.value);
  };

  const rows = () => {
    let filteredPersons = persons.filter(person => {
      return person.name.toUpperCase().indexOf(newSearch.toUpperCase()) !== -1;
    });

    return filteredPersons.map(person => {
      return (
        <li key={person.name}>
          {person.name} / {person.number}
        </li>
      );
    });
  };

  return (
    <div>
      <h1>PhoneBook</h1>
      <Filter value={newSearch} onChange={handleSearchChange} />
      <br />
      <PersonForm
        onSubmit={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newPhone={newPhone}
        handlePhoneChange={handlePhoneChange}
      />
      <br />
      <h2>Numbers</h2>
      <Persons rows={rows()} />
    </div>
  );
};

export default App;

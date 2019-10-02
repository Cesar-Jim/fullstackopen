import React, { useState, useEffect } from "react";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

import personService from "./services/persons";

const App = () => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    personService.getAll().then(initialPersons => setPersons(initialPersons));
  }, []);

  const addPerson = event => {
    event.preventDefault();

    const personObject = {
      name: newName,
      number: newNumber
    };

    const nameExists = persons.find(personObject => {
      return personObject.name === newName;
    });

    if (nameExists) {
      alert(`${newName} is already added to phoneBook.`);
    } else {
      personService.create(personObject).then(data => {
        setPersons(persons.concat(data));
      });
      setNewName("");
      setNewNumber("");
    }
  };

  const deletePerson = person => {
    if (window.confirm(`Are you sure you want to delete "${person.name}"?`)) {
      const personToDelete = persons.find(p => p.id === person.id);

      personService.deletePerson(personToDelete).then(() => {
        setPersons(persons.filter(p => p !== person));
      });
    }
  };

  const handleNameChange = event => {
    setNewName(event.target.value);
  };

  const handleNumberChange = event => {
    setNewNumber(event.target.value);
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
          {person.name} / {person.number}{" "}
          <button onClick={() => deletePerson(person)}>delete</button>
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
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <br />
      <h2>Numbers</h2>
      <Persons rows={rows()} />
    </div>
  );
};

export default App;

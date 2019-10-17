import React, { useState, useEffect } from "react";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");
  const [persons, setPersons] = useState([]);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
      .catch(error => {
        setMessageType("error");
        setMessage(`Error (couldn't load data): ${error}`);
        setTimeout(() => {
          setMessageType(null);
          setMessage(null);
        }, 5000);
      });
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
      if (
        window.confirm(
          `"${personObject.name}" is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const personToUpdate = persons.find(p => p.name === personObject.name);

        personService
          .updateNumber(personToUpdate, personObject)
          .then(() => {
            setPersons(
              persons.splice(persons.indexOf(personToUpdate), 1, personObject)
            );
            setPersons(persons);
          })
          .catch(error => {
            setMessageType("error");
            setMessage(`Error (couldn't add number): ${error}`);
            setTimeout(() => {
              setMessageType(null);
              setMessage(null);
            }, 5000);
          });

        setNewName("");
        setNewNumber("");
      }
    } else {
      personService
        .create(personObject)
        .then(data => {
          setPersons(persons.concat(data));
          setMessageType("success");
          setMessage(`Added ${personObject.name}!`);
          setTimeout(() => {
            setMessage(null);
            setMessageType(null);
          }, 5000);
        })
        .catch(error => {
          setMessageType("error");
          setMessage(`${JSON.stringify(error.response.data.error)}`);
          setTimeout(() => {
            setMessageType(null);
            setMessage(null);
          }, 5000);
        });
      setNewName("");
      setNewNumber("");
    }
  };

  const deletePerson = person => {
    if (window.confirm(`Are you sure you want to delete "${person.name}"?`)) {
      const personToDelete = persons.find(p => p.id === person.id);

      personService
        .deletePerson(personToDelete)
        .then(() => {
          setPersons(persons.filter(p => p !== person));
        })
        .catch(error => {
          setMessageType("error");
          setMessage(`Error (couldn't delete record of person): ${error}`);
          setTimeout(() => {
            setMessageType(null);
            setMessage(null);
          }, 5000);
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
      <Notification message={message} messageType={messageType} />
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

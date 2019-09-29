import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", phone: "040-123456" },
    { name: "Ada Lovelace", phone: "39-44-5323523" },
    { name: "Dan Abramov", phone: "12-43-234345" },
    { name: "Mary Poppendieck", phone: "39-23-6423122" }
  ]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newSearch, setNewSearch] = useState("");

  const addPerson = event => {
    event.preventDefault();

    const personObject = {
      name: newName,
      phone: newPhone
    };

    const nameExists = persons.find(personObject => {
      return personObject.name === newName;
    });

    if (nameExists) {
      alert(`${newName} is already added to phoneBook.`);
    } else {
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
          {person.name} / {person.phone}
        </li>
      );
    });
  };

  return (
    <div>
      <h1>PhoneBook</h1>
      <div>
        filter shown with:{" "}
        <input id="search" value={newSearch} onChange={handleSearchChange} />
      </div>
      <br />
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <br />
        <div>
          phone: <input value={newPhone} onChange={handlePhoneChange} />
        </div>
        <br />
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>{rows()}</ul>
    </div>
  );
};

export default App;

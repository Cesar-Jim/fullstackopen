import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", id: "Arto Hellas" }
  ]);
  const [newName, setNewName] = useState("");

  const addPerson = event => {
    event.preventDefault();

    const personObject = {
      name: newName,
      id: newName
    };

    setPersons(persons.concat(personObject));
    setNewName("");
  };

  const handleNameChange = event => {
    setNewName(event.target.value);
  };

  const rows = () =>
    persons.map(person => <li key={person.id}>{person.name}</li>);

  return (
    <div>
      <h1>PhoneBook</h1>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
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

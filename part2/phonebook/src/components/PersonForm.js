import React from "react";
import NameInput from "./NameInput";
import NumberInput from "./NumberInput";

const PersonForm = props => {
  const {
    onSubmit,
    newName,
    handleNameChange,
    newNumber,
    handleNumberChange
  } = props;

  return (
    <div>
      <h3>Add a new person</h3>
      <form onSubmit={onSubmit}>
        <NameInput value={newName} onChange={handleNameChange} />
        <NumberInput value={newNumber} onChange={handleNumberChange} />
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;

import React from "react";
import NameInput from "./NameInput";
import PhoneInput from "./PhoneInput";

const PersonForm = props => {
  const {
    onSubmit,
    newName,
    handleNameChange,
    newPhone,
    handlePhoneChange
  } = props;

  return (
    <div>
      <h3>Add a new person</h3>
      <form onSubmit={onSubmit}>
        <NameInput value={newName} onChange={handleNameChange} />
        <PhoneInput value={newPhone} onChange={handlePhoneChange} />
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;

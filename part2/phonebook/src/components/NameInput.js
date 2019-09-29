import React from "react";

const NameInput = props => {
  const { value, onChange } = props;

  return (
    <div>
      name: <input value={value} onChange={onChange} />
    </div>
  );
};

export default NameInput;

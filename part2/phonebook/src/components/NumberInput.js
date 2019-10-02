import React from "react";

const NumberInput = props => {
  const { value, onChange } = props;

  return (
    <div>
      number: <input value={value} onChange={onChange} />
    </div>
  );
};

export default NumberInput;

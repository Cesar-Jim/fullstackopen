import React from "react";

const PhoneInput = props => {
  const { value, onChange } = props;

  return (
    <div>
      phone: <input value={value} onChange={onChange} />
    </div>
  );
};

export default PhoneInput;

import React from "react";

const Persons = props => {
  const { rows } = props;
  return <ul>{rows}</ul>;
};

export default Persons;

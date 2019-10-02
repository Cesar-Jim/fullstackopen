import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

const create = newPersonObject => {
  const request = axios.post(baseUrl, newPersonObject);
  return request.then(response => response.data);
};

const deletePerson = personObject => {
  const personUrl = `${baseUrl}/${personObject.id}`;
  const request = axios.delete(personUrl, personObject);

  //console.log(`deleting this id: ${personObject.id}`);

  return request.then(response => response.data);
};

export default { getAll, create, deletePerson };

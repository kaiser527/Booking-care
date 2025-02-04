import axios from "../axios";

const createNewSpecialtyAPI = (data) => {
  return axios.post("api/create-new-specialty", data);
};

const getAllSpecialty = () => {
  return axios.get("api/get-all-specialties");
};

export { createNewSpecialtyAPI, getAllSpecialty };

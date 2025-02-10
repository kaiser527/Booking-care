import axios from "../axios";

const createNewSpecialtyAPI = (data) => {
  return axios.post("api/create-new-specialty", data);
};

const getAllSpecialty = () => {
  return axios.get("api/get-all-specialties");
};

const getSpecialtyById = (id, location) => {
  return axios.get(
    `api/get-detail-specialty-by-id?id=${id}&location=${location}`
  );
};

const getProvinceSpecialty = () => {
  return axios.get("/api/get-province-specialty");
};

export {
  getProvinceSpecialty,
  createNewSpecialtyAPI,
  getAllSpecialty,
  getSpecialtyById,
};

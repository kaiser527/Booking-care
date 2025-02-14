import axios from "../axios";

const createNewClinicAPI = (data) => {
  return axios.post("api/create-new-clinic", data);
};

const getAllClinic = () => {
  return axios.get("api/get-all-clinics");
};

const getDetailClinicById = (id) => {
  return axios.get(`api/get-detail-clinic-by-id?id=${id}`);
};

export { createNewClinicAPI, getAllClinic, getDetailClinicById };

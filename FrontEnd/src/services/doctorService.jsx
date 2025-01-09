import axios from "../axios";

const getTopDoctorHomeService = (limit) => {
  return axios.get(`api/top-doctor-home?limit=${limit}`);
};

const getAllDoctors = () => {
  return axios.get(`api/get-all-doctors`);
};

const saveDetailDoctor = (data) => {
  return axios.post("api/save-info-doctor", data);
};

const getDetailInforDoctor = (id) => {
  return axios.get(`api/get-detail-doctor-by-id?id=${id}`);
};

const getDoctorMarkdown = (id) => {
  return axios.get(`api/get-doctor-markdown-by-id?id=${id}`);
};

export {
  getTopDoctorHomeService,
  getAllDoctors,
  saveDetailDoctor,
  getDetailInforDoctor,
  getDoctorMarkdown,
};

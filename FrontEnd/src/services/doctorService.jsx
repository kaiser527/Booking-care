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

const saveBulkScheduleDoctor = (data) => {
  return axios.post("api/bulk-create-schedule", data);
};

const getScheduleDoctorByDate = (doctorId, date) => {
  return axios.get(
    `api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`
  );
};

const deletePastScheduleDoctorAPI = (date) => {
  return axios.delete(`api/delete-past-schedule-doctor?date=${date}`);
};

const getPastDoctorScheduleAPI = () => {
  return axios.get("api/get-past-doctor-schedule");
};

export {
  getTopDoctorHomeService,
  getAllDoctors,
  saveDetailDoctor,
  getDetailInforDoctor,
  getDoctorMarkdown,
  saveBulkScheduleDoctor,
  getScheduleDoctorByDate,
  deletePastScheduleDoctorAPI,
  getPastDoctorScheduleAPI,
};

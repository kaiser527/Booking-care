import actionTypes from "./actionTypes";
import {
  getTopDoctorHomeService,
  getAllDoctors,
  saveDetailDoctor,
  getDetailInforDoctor,
  getDoctorMarkdown,
} from "../../services/doctorService";
import { toast } from "react-toastify";

export const fetchTopDoctor = () => {
  return async (dispatch, getState) => {
    try {
      const res = await getTopDoctorHomeService("");
      if (res && res.errCode === 0) {
        dispatch(fetchTopDoctorSuccess(res.data));
      } else {
        dispatch(fetchTopDoctorFailed());
      }
    } catch (e) {
      dispatch(fetchTopDoctorFailed());
      console.log(e);
    }
  };
};

export const fetchTopDoctorSuccess = (doctorData) => ({
  type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
  data: doctorData,
});

export const fetchTopDoctorFailed = () => ({
  type: actionTypes.FETCH_TOP_DOCTOR_FAILED,
});

export const fetchAllDoctor = () => {
  return async (dispatch, getState) => {
    try {
      const res = await getAllDoctors();
      if (res && res.errCode === 0) {
        dispatch(fetchAllDoctorSuccess(res.data));
      } else {
        dispatch(fetchAllDoctorFailed());
      }
    } catch (e) {
      dispatch(fetchAllDoctorFailed());
      console.log(e);
    }
  };
};

export const fetchAllDoctorSuccess = (doctorData) => ({
  type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
  data: doctorData,
});

export const fetchAllDoctorFailed = () => ({
  type: actionTypes.FETCH_ALL_DOCTOR_FAILED,
});

export const saveDetailDoctorRedux = (data) => {
  return async (dispatch, getState) => {
    try {
      const res = await saveDetailDoctor(data);
      if (res && res.errCode === 0) {
        dispatch(saveDetailDoctorSuccess());
        toast.success(res.message);
      } else {
        dispatch(saveDetailDoctorFailed());
        toast.error(res.errMessage);
      }
    } catch (e) {
      dispatch(saveDetailDoctorFailed());
      console.log(e);
    }
  };
};

export const saveDetailDoctorSuccess = () => ({
  type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
});

export const saveDetailDoctorFailed = () => ({
  type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
});

export const getDetailDoctorRedux = (id) => {
  return async (dispatch, getState) => {
    try {
      const res = await getDetailInforDoctor(id);
      if (res && res.errCode === 0) {
        dispatch(getDetailDoctorSuccess(res.data));
      } else {
        dispatch(getDetailDoctorFailed());
      }
    } catch (e) {
      dispatch(getDetailDoctorFailed());
      console.log(e);
    }
  };
};

export const getDetailDoctorSuccess = (doctorData) => ({
  type: actionTypes.GET_DETAIL_DOCTOR_SUCCESS,
  data: doctorData,
});

export const getDetailDoctorFailed = () => ({
  type: actionTypes.GET_DETAIL_DOCTOR_FAILED,
});

export const getDoctorMarkdownRedux = (id) => {
  return async (dispatch, getState) => {
    try {
      const res = await getDoctorMarkdown(id);
      if (res && res.errCode === 0) {
        dispatch(getDoctorMarkdownSuccess(res.data));
      } else {
        dispatch(getDoctorMarkdownFailed());
      }
    } catch (e) {
      dispatch(getDoctorMarkdownFailed());
      console.log(e);
    }
  };
};

export const getDoctorMarkdownSuccess = (doctorData) => ({
  type: actionTypes.GET_DOCTOR_MARKDOWN_SUCCESS,
  data: doctorData,
});

export const getDoctorMarkdownFailed = () => ({
  type: actionTypes.GET_DETAIL_DOCTOR_FAILED,
});

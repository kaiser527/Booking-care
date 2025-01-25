import actionTypes from "./actionTypes";
import {
  getTopDoctorHomeService,
  getAllDoctors,
  saveDetailDoctor,
  getDetailInforDoctor,
  getDoctorMarkdown,
  saveBulkScheduleDoctor,
  getScheduleDoctorByDate,
  deletePastScheduleDoctorAPI,
  getProfileDoctor,
} from "../../services/doctorService";
import { toast } from "react-toastify";
import { getAllCodeService } from "../../services/userService";

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

export const fetchAllScheduleTimesRedux = () => {
  return async (dispatch, getState) => {
    try {
      const res = await getAllCodeService("TIME");
      if (res && res.errCode === 0) {
        dispatch(fetchAllScheduleTimesSuccess(res.data));
      } else {
        dispatch(fetchAllScheduleTimesFailed());
      }
    } catch (e) {
      dispatch(fetchAllScheduleTimesFailed());
      console.log(e);
    }
  };
};

export const fetchAllScheduleTimesSuccess = (scheduleHourData) => ({
  type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIMES_SUCCESS,
  data: scheduleHourData,
});

export const fetchAllScheduleTimesFailed = () => ({
  type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIMES_FAILED,
});

export const bulkCreateDoctorRedux = (data) => {
  return async (dispatch, getState) => {
    try {
      const res = await saveBulkScheduleDoctor(data);
      if (res && res.errCode === 0) {
        dispatch(bulkCreateDoctorSuccess());
        toast.success(res.message);
      } else {
        dispatch(bulkCreateDoctorSuccess());
        toast.error(res.errMessage);
      }
    } catch (e) {
      dispatch(bulkCreateDoctorSuccess());
      console.log(e);
    }
  };
};

export const bulkCreateDoctorSuccess = () => ({
  type: actionTypes.SAVE_BULK_SCHEDULE_DOCTOR_SUCCESS,
});

export const bulkCreateDoctorFailed = () => ({
  type: actionTypes.SAVE_BULK_SCHEDULE_DOCTOR_FAILED,
});

export const getScheduleDoctorByDateRedux = (doctorId, date) => {
  return async (dispatch, getState) => {
    try {
      const res = await getScheduleDoctorByDate(doctorId, date);
      if (res && res.errCode === 0) {
        dispatch(getScheduleDoctorByDateSuccess(res.data));
      } else {
        dispatch(getScheduleDoctorByDateFailed());
      }
    } catch (e) {
      dispatch(getScheduleDoctorByDateFailed());
      console.log(e);
    }
  };
};

export const getScheduleDoctorByDateSuccess = (scheduleData) => ({
  type: actionTypes.GET_SCHEDULE_DOCTOR_BY_DATE_SUCCESS,
  data: scheduleData,
});

export const getScheduleDoctorByDateFailed = () => ({
  type: actionTypes.GET_SCHEDULE_DOCTOR_BY_DATE_FAILED,
});

export const deletePastScheduleDoctorRedux = (date) => {
  return async (dispatch, getState) => {
    try {
      const res = await deletePastScheduleDoctorAPI(date);
      if (res && res.errCode === 0) {
        dispatch(deletePastScheduleDoctorSuccess());
        toast.success(res.message);
      } else {
        dispatch(deletePastScheduleDoctorFailed());
        toast.error(res.errMessage);
      }
    } catch (e) {
      dispatch(deletePastScheduleDoctorFailed());
      console.log(e);
    }
  };
};

export const deletePastScheduleDoctorSuccess = () => ({
  type: actionTypes.DELETE_PAST_SCHEDULE_DOCTOR_SUCCESS,
});

export const deletePastScheduleDoctorFailed = () => ({
  type: actionTypes.DELETE_PAST_SCHEDULE_DOCTOR_FAILED,
});

export const getProfileDoctorRedux = (id) => {
  return async (dispatch, getState) => {
    try {
      const res = await getProfileDoctor(id);
      if (res && res.errCode === 0) {
        dispatch(getProfileDoctorSuccess(res.data));
      } else {
        dispatch(getProfileDoctorFailed());
      }
    } catch (e) {
      dispatch(getProfileDoctorFailed());
      console.log(e);
    }
  };
};

export const getProfileDoctorSuccess = (doctorData) => ({
  type: actionTypes.GET_DOCTOR_PROFILE_SUCCESS,
  data: doctorData,
});

export const getProfileDoctorFailed = () => ({
  type: actionTypes.GET_DOCTOR_PROFILE_FAILED,
});

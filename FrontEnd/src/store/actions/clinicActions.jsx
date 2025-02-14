import { toast } from "react-toastify";
import { createNewClinicAPI, getAllClinic } from "../../services/clinicService";
import actionTypes from "./actionTypes";

export const createNewClinicRedux = (data) => {
  return async (dispatch, getState) => {
    try {
      const res = await createNewClinicAPI(data);
      if (res && res.errCode === 0) {
        dispatch(createNewClinicSuccess());
        dispatch(fetchAllClinicRedux());
        toast.success(res.message);
      } else {
        dispatch(createNewClinicFAILED());
        toast.error(res.errMessage);
      }
    } catch (e) {
      dispatch(createNewClinicFAILED());
      console.log(e);
    }
  };
};

export const createNewClinicSuccess = () => ({
  type: actionTypes.CREATE_NEW_SPECIALTY_SUCCESS,
});

export const createNewClinicFAILED = () => ({
  type: actionTypes.CREATE_NEW_SPECIALTY_FAILED,
});

export const fetchAllClinicRedux = () => {
  return async (dispatch, getState) => {
    try {
      const res = await getAllClinic();
      if (res && res.errCode === 0) {
        dispatch(fetchAllClinicSuccess(res.data));
      } else {
        dispatch(fetchAllClinicFailed());
      }
    } catch (e) {
      dispatch(fetchAllClinicFailed());
      console.log(e);
    }
  };
};

export const fetchAllClinicSuccess = (clinicData) => ({
  type: actionTypes.FETCH_ALL_CLINIC_SUCCESS,
  data: clinicData,
});

export const fetchAllClinicFailed = () => ({
  type: actionTypes.FETCH_ALL_CLINIC_FAILED,
});

import { toast } from "react-toastify";
import actionTypes from "./actionTypes";
import {
  createNewSpecialtyAPI,
  getAllSpecialty,
} from "../../services/specialtyService";

export const createNewSpecialtyRedux = (data) => {
  return async (dispatch, getState) => {
    try {
      const res = await createNewSpecialtyAPI(data);
      if (res && res.errCode === 0) {
        dispatch(createNewSpecialtySuccess());
        dispatch(fetchAllSpecialtyRedux());
        toast.success(res.message);
      } else {
        dispatch(createNewSpecialtyFAILED());
        toast.error(res.errMessage);
      }
    } catch (e) {
      dispatch(createNewSpecialtyFAILED());
      console.log(e);
    }
  };
};

export const createNewSpecialtySuccess = () => ({
  type: actionTypes.CREATE_NEW_SPECIALTY_SUCCESS,
});

export const createNewSpecialtyFAILED = () => ({
  type: actionTypes.CREATE_NEW_SPECIALTY_FAILED,
});

export const fetchAllSpecialtyRedux = () => {
  return async (dispatch, getState) => {
    try {
      const res = await getAllSpecialty();
      if (res && res.errCode === 0) {
        dispatch(fetchAllSpecialtySuccess(res.data));
      } else {
        dispatch(fetchAllSpecialtyFailed());
      }
    } catch (e) {
      dispatch(fetchAllSpecialtyFailed());
      console.log(e);
    }
  };
};

export const fetchAllSpecialtySuccess = (specialtyData) => ({
  type: actionTypes.FETCH_ALL_SPECIALTY_SUCCESS,
  data: specialtyData,
});

export const fetchAllSpecialtyFailed = () => ({
  type: actionTypes.FETCH_ALL_SPECIALTY_FAILED,
});

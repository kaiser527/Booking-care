import actionTypes from "./actionTypes";
import {
  getGenderPatient,
  handleLogout,
  postForgotPasswordAPI,
  postPatientBookingAppointment,
  postResetPasswordAPI,
} from "../../services/userService";
import { toast } from "react-toastify";

export const addUserSuccess = () => ({
  type: actionTypes.ADD_USER_SUCCESS,
});

export const userLoginSuccess = (userInfo) => ({
  type: actionTypes.USER_LOGIN_SUCCESS,
  userInfo: userInfo,
});

export const userLoginFail = () => ({
  type: actionTypes.USER_LOGIN_FAIL,
});

export const processLogoutSuccess = () => ({
  type: actionTypes.PROCESS_LOGOUT,
});

export const processLogout = () => {
  return async (dispatch, getState) => {
    try {
      const res = await handleLogout();
      if (res && res.errCode === 0) {
        dispatch(processLogoutSuccess());
      } else {
        dispatch(userLoginFail());
      }
    } catch (e) {
      dispatch(userLoginFail());
      console.log(e);
    }
  };
};

export const fetchGenderPatient = () => {
  return async (dispatch, getState) => {
    try {
      const res = await getGenderPatient();
      if (res && res.errCode === 0) {
        dispatch(fetchGenderPatientSuccess(res.data));
      } else {
        dispatch(fetchGenderPatientFailed());
      }
    } catch (e) {
      dispatch(fetchGenderPatientFailed());
      console.log(e);
    }
  };
};

export const fetchGenderPatientSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_PATIENT_SUCCESS,
  data: genderData,
});

export const fetchGenderPatientFailed = () => ({
  type: actionTypes.FETCH_GENDER_PATIENT_FAILED,
});

export const postBookingAppointmentRedux = (data) => {
  return async (dispatch, getState) => {
    try {
      const res = await postPatientBookingAppointment(data);
      if (res && res.errCode === 0) {
        dispatch(postBookingAppointmentSuccess());
        toast.success(res.message);
      } else {
        dispatch(postBookingAppointmentFailed());
        toast.error(res.errMessage);
      }
    } catch (e) {
      dispatch(postBookingAppointmentFailed());
      console.log(e);
    }
  };
};

export const postBookingAppointmentSuccess = () => ({
  type: actionTypes.BOOKING_PATIENT_APPOINTMENT_SUCCESS,
});

export const postBookingAppointmentFailed = () => ({
  type: actionTypes.BOOKING_PATIENT_APPOINTMENT_FAILED,
});

export const postForgotPasswordRedux = (data) => {
  return async (dispatch, getState) => {
    try {
      const res = await postForgotPasswordAPI(data);
      if (res && res.errCode === 0) {
        dispatch(postForgotPasswordSuccess());
        toast.success(res.message);
      } else {
        dispatch(postForgotPasswordFailed());
        toast.error(res.errMessage);
      }
    } catch (e) {
      dispatch(postForgotPasswordFailed());
      console.log(e);
    }
  };
};

export const postForgotPasswordSuccess = () => ({
  type: actionTypes.ACTION_CLICK_BTN_FORGOT_PASSWORD_SUCCESS,
});

export const postForgotPasswordFailed = () => ({
  type: actionTypes.ACTION_CLICK_BTN_FORGOT_PASSWORD_FAILED,
});

export const verifyResetPasswordRedux = (data) => {
  return async (dispatch, getState) => {
    try {
      const res = await postResetPasswordAPI(data);
      if (res && res.errCode === 0) {
        dispatch(verifyResetPasswordSuccess());
        toast.success(res.message);
      } else {
        dispatch(verifyResetPasswordFailed());
        toast.error(res.errMessage);
      }
    } catch (e) {
      dispatch(verifyResetPasswordFailed());
      console.log(e);
    }
  };
};

export const verifyResetPasswordSuccess = () => ({
  type: actionTypes.VERIFY_RESET_PASSWORD_SUCCESS,
});

export const verifyResetPasswordFailed = () => ({
  type: actionTypes.VERIFY_RESET_PASSWORD_FAILED,
});

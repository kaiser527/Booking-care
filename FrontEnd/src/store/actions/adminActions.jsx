import actionTypes from "./actionTypes";
import {
  getAllCodeService,
  createNewUserService,
  getAllUsers,
  deleteUserService,
  editUserService,
} from "../../services/userService";
import { toast } from "react-toastify";
import { getAllSpecialty } from "../../services/specialtyService";

export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      const res = await getAllCodeService("GENDER");
      if (res && res.errCode === 0) {
        dispatch(fetchGenderSuccess(res.data));
      } else {
        dispatch(fetchGenderFailed());
      }
    } catch (e) {
      dispatch(fetchGenderFailed());
      console.log(e);
    }
  };
};

export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
});

export const fetchGenderFailed = () => ({
  type: actionTypes.FETCH_GENDER_FAILED,
});

export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      const res = await getAllCodeService("POSITION");
      if (res && res.errCode === 0) {
        dispatch(fetchPositionSuccess(res.data));
      } else {
        dispatch(fetchPositionFailed());
      }
    } catch (e) {
      dispatch(fetchPositionFailed());
      console.log(e);
    }
  };
};

export const fetchPositionSuccess = (positionData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: positionData,
});

export const fetchPositionFailed = () => ({
  type: actionTypes.FETCH_POSITION_FAILED,
});

export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      const res = await getAllCodeService("ROLE");
      if (res && res.errCode === 0) {
        dispatch(fetchRoleSuccess(res.data));
      } else {
        dispatch(fetchRoleFailed());
      }
    } catch (e) {
      dispatch(fetchRoleFailed());
      console.log(e);
    }
  };
};

export const fetchRoleSuccess = (roleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: roleData,
});

export const fetchRoleFailed = () => ({
  type: actionTypes.FETCH_ROLE_FAILED,
});

export const createNewUserRedux = (data) => {
  return async (dispatch, getState) => {
    try {
      const res = await createNewUserService(data);
      if (res && res.errCode === 0) {
        dispatch(createUserSuccess());
        dispatch(fetchAllUserRedux(1, 4));
        toast.success(res.message);
      } else {
        dispatch(createUserFailed());
        toast.error(res.errMessage);
      }
    } catch (e) {
      dispatch(createUserFailed());
      console.log(e);
    }
  };
};

export const createUserSuccess = () => ({
  type: actionTypes.CREATE_USER_SUCCESS,
});

export const createUserFailed = () => ({
  type: actionTypes.CREATE_USER_FAILED,
});

export const fetchAllUserRedux = (page, limit) => {
  return async (dispatch, getState) => {
    try {
      const res = await getAllUsers(page, limit);
      if (res && res.errCode === 0) {
        let users = res.data;
        dispatch(fetchAllUserSuccess(users));
      } else {
        dispatch(fetchAllUserFailed());
      }
    } catch (e) {
      dispatch(fetchAllUserFailed());
      console.log(e);
    }
  };
};

export const fetchAllUserSuccess = (userData) => ({
  type: actionTypes.FETCH_ALL_USER_SUCCESS,
  data: userData,
});

export const fetchAllUserFailed = () => ({
  type: actionTypes.FETCH_ALL_USER_FAILED,
});

export const deleteUserRedux = (userId) => {
  return async (dispatch, getState) => {
    try {
      const res = await deleteUserService(userId);
      if (res && res.errCode === 0) {
        dispatch(deleteUserSuccess());
        dispatch(fetchAllUserRedux(1, 4));
        toast.success(res.message);
      } else {
        dispatch(deleteUserFailed());
        toast.error(res.errMessage);
      }
    } catch (e) {
      dispatch(deleteUserFailed());
      console.log(e);
    }
  };
};

export const deleteUserSuccess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});

export const deleteUserFailed = () => ({
  type: actionTypes.DELETE_USER_FAILED,
});

export const editUserRedux = (data) => {
  return async (dispatch, getState) => {
    try {
      const res = await editUserService(data);
      if (res && res.errCode === 0) {
        dispatch(editUserSuccess());
        dispatch(fetchAllUserRedux(1, 4));
        toast.success(res.message);
      } else {
        dispatch(editUserFailed());
        toast.error(res.errMessage);
      }
    } catch (e) {
      dispatch(editUserFailed());
      console.log(e);
    }
  };
};

export const editUserSuccess = () => ({
  type: actionTypes.EDIT_USER_SUCCESS,
});

export const editUserFailed = () => ({
  type: actionTypes.EDIT_USER_FAILED,
});

export const fetchRequiredDoctorInfo = () => {
  return async (dispatch, getState) => {
    try {
      const resProvince = await getAllCodeService("PROVINCE");
      const resPrice = await getAllCodeService("PRICE");
      const resPayment = await getAllCodeService("PAYMENT");
      const resSpecialty = await getAllSpecialty();
      if (
        resProvince &&
        resProvince.errCode === 0 &&
        resPrice &&
        resPrice.errCode === 0 &&
        resPayment &&
        resPayment.errCode === 0 &&
        resSpecialty.errCode === 0
      ) {
        dispatch(
          fetchRequiredDoctorInfoSuccess({
            resPrice: resPrice.data,
            resProvince: resProvince.data,
            resPayment: resPayment.data,
            resSpecialty: resSpecialty.data,
          })
        );
      } else {
        dispatch(fetchRequiredDoctorInfoFailed());
      }
    } catch (e) {
      dispatch(fetchRequiredDoctorInfoFailed());
      console.log(e);
    }
  };
};

export const fetchRequiredDoctorInfoSuccess = (infoData) => ({
  type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_SUCCESS,
  data: infoData,
});

export const fetchRequiredDoctorInfoFailed = () => ({
  type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_FAILED,
});

import actionTypes from "./actionTypes";
import { handleLogout } from "../../services/userService";

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

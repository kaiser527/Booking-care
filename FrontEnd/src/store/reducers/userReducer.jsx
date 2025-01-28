import actionTypes from "../actions/actionTypes";

const initialState = {
  isLoggedIn: false,
  userInfo: null,
  genders: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        userInfo: action.userInfo,
      };
    case actionTypes.USER_LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        userInfo: null,
      };
    case actionTypes.PROCESS_LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        userInfo: null,
      };
    case actionTypes.FETCH_GENDER_PATIENT_SUCCESS:
      return {
        ...state,
        genders: action.data,
      };
    case actionTypes.FETCH_GENDER_PATIENT_FAILED:
      return {
        ...state,
        genders: [],
      };
    default:
      return state;
  }
};

export default userReducer;

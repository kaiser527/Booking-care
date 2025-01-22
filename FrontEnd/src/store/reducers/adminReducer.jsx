import actionTypes from "../actions/actionTypes";

const initialState = {
  genders: [],
  roles: [],
  positions: [],
  users: [],
  infoData: {},
};

const adminReducer = (state = initialState, action) => {
  let copyState = { ...state };
  switch (action.type) {
    case actionTypes.FETCH_GENDER_SUCCESS:
      copyState.genders = action.data;
      return {
        ...copyState,
      };

    case actionTypes.FETCH_GENDER_FAILED:
      copyState.genders = [];
      return {
        ...copyState,
      };

    case actionTypes.FETCH_POSITION_SUCCESS:
      copyState.positions = action.data;
      return {
        ...copyState,
      };

    case actionTypes.FETCH_POSITION_FAILED:
      copyState.positions = [];
      return {
        ...copyState,
      };

    case actionTypes.FETCH_ROLE_SUCCESS:
      copyState.roles = action.data;
      return {
        ...copyState,
      };

    case actionTypes.FETCH_ROLE_FAILED:
      copyState.roles = [];
      return {
        ...copyState,
      };

    case actionTypes.FETCH_ALL_USER_SUCCESS:
      copyState.users = action.data;
      return {
        ...copyState,
      };

    case actionTypes.FETCH_ALL_USER_FAILED:
      copyState.users = [];
      return {
        ...copyState,
      };
    case actionTypes.FETCH_REQUIRED_DOCTOR_INFO_SUCCESS:
      copyState.infoData = action.data;
      return {
        ...copyState,
      };

    case actionTypes.FETCH_REQUIRED_DOCTOR_INFO_FAILED:
      copyState.infoData = {};
      return {
        ...copyState,
      };

    default:
      return state;
  }
};

export default adminReducer;

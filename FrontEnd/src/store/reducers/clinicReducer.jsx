import actionTypes from "../actions/actionTypes";

const initialState = {
  clinics: [],
};

const clinicReducer = (state = initialState, action) => {
  let copyState = { ...state };
  switch (action.type) {
    case actionTypes.FETCH_ALL_CLINIC_FAILED:
      copyState.clinics = [];
      return {
        ...copyState,
      };

    case actionTypes.FETCH_ALL_CLINIC_SUCCESS:
      copyState.clinics = action.data;
      return {
        ...copyState,
      };
    default:
      return state;
  }
};

export default clinicReducer;

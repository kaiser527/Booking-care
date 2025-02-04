import actionTypes from "../actions/actionTypes";

const initialState = {
  specialties: [],
};

const specialtyReducer = (state = initialState, action) => {
  let copyState = { ...state };
  switch (action.type) {
    case actionTypes.FETCH_ALL_SPECIALTY_FAILED:
      copyState.specialties = [];
      return {
        ...copyState,
      };

    case actionTypes.FETCH_ALL_SPECIALTY_SUCCESS:
      copyState.specialties = action.data;
      return {
        ...copyState,
      };

    default:
      return state;
  }
};

export default specialtyReducer;

import actionTypes from "../actions/actionTypes";

const initialState = {
  topdoctors: [],
  alldoctors: [],
  detailDoctor: {},
  doctorMarkdown: {},
};

const doctorReducer = (state = initialState, action) => {
  let copyState = { ...state };
  switch (action.type) {
    case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
      copyState.topdoctors = action.data;
      return {
        ...copyState,
      };

    case actionTypes.FETCH_TOP_DOCTOR_FAILED:
      copyState.topdoctors = [];
      return {
        ...copyState,
      };

    case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
      copyState.alldoctors = action.data;
      return {
        ...copyState,
      };

    case actionTypes.FETCH_ALL_DOCTOR_FAILED:
      copyState.alldoctors = [];
      return {
        ...copyState,
      };

    case actionTypes.GET_DETAIL_DOCTOR_SUCCESS:
      copyState.detailDoctor = action.data;
      return {
        ...copyState,
      };

    case actionTypes.GET_DETAIL_DOCTOR_FAILED:
      copyState.detailDoctor = {};
      return {
        ...copyState,
      };

    case actionTypes.GET_DOCTOR_MARKDOWN_SUCCESS:
      copyState.doctorMarkdown = action.data;
      return {
        ...copyState,
      };

    case actionTypes.GET_DOCTOR_MARKDOWN_FAILED:
      copyState.doctorMarkdown = {};
      return {
        ...copyState,
      };

    default:
      return state;
  }
};

export default doctorReducer;

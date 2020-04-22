import { actionFeedbackTypes } from "../constants/actionTypes";

const initialData = {
  questions: {},
  fetchingQuestions: false,
};

const feedbackReducer = (state = initialData, action) => {
  switch (action.type) {
        case actionFeedbackTypes.FETCHED_QUESTIONS:
        return {
          ...state,
          questions: action.payload,
          fetchingQuestions: false,
        }
    default:
      return state;
  }
};
export default feedbackReducer;

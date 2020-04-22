import { actionFeedbackTypes } from "../constants/actionTypes";

const initialData = {
  questions: {},
  fetchingQuestions: false,
  submittingQuestions: false,
};

const feedbackReducer = (state = initialData, action) => {
  switch (action.type) {
    case actionFeedbackTypes.QUESTIONS:
      return {
        ...state,
        fetchingQuestions: true,
      }
    case actionFeedbackTypes.FETCHED_QUESTIONS:
      return {
        ...state,
        questions: action.payload,
        fetchingQuestions: false,
      }
      case actionFeedbackTypes.POST_QUESTIONS:
        return {
          ...state,
          submittingQuestions: true,
        }
      case actionFeedbackTypes.SUBMITTED_QUESTIONS:
        return {
          ...state,
          questions: action.payload,
          submittingQuestions: false,
        }
    default:
      return state;
  }
};
export default feedbackReducer;

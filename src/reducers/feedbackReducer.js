import { actionFeedbackTypes } from "../constants/actionTypes";

const initialData = {
  questions: {},
  fetchingQuestions: false,
  submittingQuestions: false,
  fetchingResponses: false,
  responses: {}
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
      case actionFeedbackTypes.RESPONSES:
        return {
          ...state,
          fetchingResponses: true,
        }
      case actionFeedbackTypes.FETCHED_RESPONSES:
        return {
          ...state,
          responses: action.payload,
          fetchingResponses: false,
        }
    default:
      return state;
  }
};
export default feedbackReducer;

import { actionEventTypes } from "../constants/actionTypes";

const initialData = {
  fetchingEvent: false,
};

const eventReducer = (state = initialData, action) => {
  switch (action.type) {
    case actionEventTypes.SET_EVENT_FETCHING:
      return {
        ...state,
        fetchingEvent: !state.fetchingEvent,
      };
        
    default:
      return state;
  }
};
export default eventReducer;

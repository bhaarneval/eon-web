import { actionEventTypes } from "../constants/actionTypes";

const initialData = {
  fetchingEvent: false,
  eventData: {},
  eventList: [],
  updateEvent: false,
};

const eventReducer = (state = initialData, action) => {
  switch (action.type) {
    case actionEventTypes.SET_EVENT_FETCHING:
      return {
        ...state,
        fetchingEvent: !state.fetchingEvent,
      };
    case actionEventTypes.RECEIVED_EVENT_LIST:
        return {
            ...state,
            eventList:action.payload,
            fetchingEvent: false
        }
    case actionEventTypes.RECEIVED_EVENT_DATA:
      return {
        ...state,
        fetchingEvent: false,
        eventData: action.payload,
      };
    case actionEventTypes.EVENT_ERROR:
      return {
        ...state,
        fetchingEvent: false,
      };
    case actionEventTypes.SET_EVENT_UPDATE:
        return {
            ...state,
            updateEvent: action.payload,
        }

    default:
      return state;
  }
};
export default eventReducer;

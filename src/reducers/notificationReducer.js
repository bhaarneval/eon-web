import { actionNotificationsTypes } from "../constants/actionTypes";

const initialData = {
  notifications: [],
};

const notificationsReducer = (state = initialData, action) => {
  switch (action.type) {
    case actionNotificationsTypes.GET_NOTIFICATIONS:
      return {
        ...state,
        fetchingNotifications: true
      }
    case actionNotificationsTypes.NOTIFICATIONS_RECIEVED:
      return {
        ...state,
        notifications: action.payload,
        fetchingNotifications: false,
      };
    case actionNotificationsTypes.NOTIFICATIONS_ERROR:
      return {
      ...state,
      fetchingNotifications:false,
    }
    case actionNotificationsTypes.READ_NOTIFICATIONS:
      return {
        ...state,
        readingNotifications: true
      }
    case actionNotificationsTypes.NOTIFICATIONS_READ:
      return {
        ...state,
        notifications: action.payload,
        readingNotifications: false,
      };
    case actionNotificationsTypes.NOTIFICATIONS_READ_ERROR:
      return {
      ...state,
      readingNotifications:false,
    }
    default:
      return state;
  }
};
export default notificationsReducer;

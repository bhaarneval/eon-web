import { actionEventTypes } from "../constants/actionTypes";

export const createNewEvent = ({formData,callback,accessToken,}) => {
    return {
      type: actionEventTypes.CREATE_EVENT,
      data: formData,
      callback,
      accessToken,
    };
}

export const fetchEvents = (userData) => {
    return {
        type: actionEventTypes.GET_EVENT_LIST,
        userData: userData
    }
}
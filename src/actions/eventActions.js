import { actionEventTypes } from "../constants/actionTypes";

export const createNewEvent = ({formData,callback,accessToken,}) => {
    return {
      type: actionEventTypes.CREATE_EVENT,
      data: formData,
      callback,
      accessToken,
    };
}

export const updateEvent = ({formData, callback, accessToken, eventId}) => {
    return {
        type: actionEventTypes.CREATE_EVENT,
        data: formData,
        callback,
        accessToken,
        eventId,
      };
}

export const fetchEvents = ({userData,accessToken}) => {
    return {
        type: actionEventTypes.GET_EVENT_LIST,
        userData,
        accessToken
    }
}

export const getEventData = ({id,accessToken,userRole,callback}) => {
    return {
        type: actionEventTypes.GET_EVENT_DATA,
        eventId:id,
        userRole: userRole,
        accessToken: accessToken,
        callback: callback
    }
}

export const saveInviteeList = ({accessToken,data}) => {
    return {
        type: actionEventTypes.SAVE_INVITEE,
        accessToken: accessToken,
        data: data,
    }
}
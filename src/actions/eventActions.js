import { actionEventTypes } from "../constants/actionTypes";

export const createNewEvent = ({formData,callback,accessToken,}) => {
    return {
      type: actionEventTypes.CREATE_EVENT,
      data: formData,
      callback,
      accessToken,
    };
}

export const updateEventData = ({formData, callback, accessToken, eventId}) => {
    return {
        type: actionEventTypes.CREATE_EVENT,
        data: formData,
        callback,
        accessToken,
        eventId,
      };
}

export const fetchEvents = ({userData,accessToken, filterData}) => {
    return {
        type: actionEventTypes.GET_EVENT_LIST,
        userData,
        accessToken,
        filterData: filterData||{},
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

export const updateInviteeList = ({accessToken,data, updateType}) => {
    return {
        type: actionEventTypes.SAVE_INVITEE,
        accessToken: accessToken,
        data: data,
        updateType: updateType,
    }
}

export const setEventUpdate = (payload) => {
    return {
        type: actionEventTypes.SET_EVENT_UPDATE,
        payload: payload
    }
}

export const cancelEvent = ({message, accessToken, eventId, callback}) => {
    return {
        type: actionEventTypes.CANCEL_EVENT,
        message: message,
        accessToken: accessToken,
        eventId: eventId,
        callback: callback,
    }
}

export const sendNotification = ({data, accessToken}) => {
    return {
        type: actionEventTypes.NOTIFY_SUBSCRIBER,
        data:data,
        accessToken: accessToken,
    }
}
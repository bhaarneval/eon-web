import { actionEventTypes, actionSubscription } from "../constants/actionTypes";

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

export const getEventData = ({id,accessToken,userRole,callback, ifUpdate}) => {
    return {
        type: actionEventTypes.GET_EVENT_DATA,
        eventId:id,
        userRole: userRole,
        accessToken: accessToken,
        callback: callback,
        ifUpdate: ifUpdate
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

export const subscriptionFreeEvent = ({data, accessToken, subscriptionType, callback}) => {
    return {
        type: actionSubscription.SUBSCRIBE_FREE,
        data: data,
        accessToken: accessToken,
        subscriptionType: subscriptionType,
        callback: callback,
    }
}
export const subscriptionPaidEvent = ({data, accessToken,callback}) => {
    return {
        type: actionSubscription.SUBSCRIBE_PAID,
        data: data,
        accessToken: accessToken,
        callback: callback,
    }
}

export const cancelSubscription = ({eventId, accessToken}) => {
    return {
        type: actionSubscription.CANCEL_SUBSCRIPTION,
        eventId,
        accessToken
    }
}
export const shareWithFriend = ({data, accessToken}) => {
    return {
        type: actionEventTypes.SHARE_WITH_FRIEND,
        data: data,
        accessToken: accessToken
    }
}
export const updateWishList = ({data, accessToken, updateType, callback}) => {
        return {
          type: actionEventTypes.WISHLIST_UPDATE,
          data: data,
          accessToken,
          updateType,
          callback
        };
}
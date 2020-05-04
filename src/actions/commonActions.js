import { actionLoginTypes, actionNotificationsTypes, actionAnalytics, actionFeedbackTypes } from "../constants/actionTypes";
import * as jwt from 'jsonwebtoken';

//get user data 
export const getUser = ({email,password,callback}) => {
  return {
    type: actionLoginTypes.GET_USER,
    email: email,
    password: password,
    callback: callback
  };
};

//fetch notifications
export const getNotifications = (access) => {
  return {
    type: actionNotificationsTypes.GET_NOTIFICATIONS,
    access: access
  };
};

//mark notification as read
export const readNotifications = ({list, access, callback}) => {
  return {
    type: actionNotificationsTypes.READ_NOTIFICATIONS,
    list: list,
    access: access,
    callback: callback
  };
};

//post user for user creation
export const postUser = ({data,callback}) => {
  return {
    type: actionLoginTypes.POST_USER,
    data: data,
    callback: callback
  }
}

//get verification code for forgot password
export const getVerificationCode = ({data,callback}) => {
  return {
    type: actionLoginTypes.GET_CODE,
    data: data,
    callback: callback
  }
}

//submit change password request for forgot password
export const postForgotPassword = ({data, callback}) => {
  return {
    type: actionLoginTypes.FORGOT_PASSWORD,
    data: data,
    callback: callback
  }
}

//request change password for logged in user
export const postChangePassword = ({data,accessToken, callback}) => {
  return {
    type: actionLoginTypes.CHANGE_PASSWORD,
    data: data,
    accessToken: accessToken,
    callback: callback,
  }
}

//clear store data and local storage and log user out
export const logOutUser = ({callback}) => {
  return {
    type: actionLoginTypes.LOGGING_OUT,
    callback: callback
  }
}

//get usr profile for my profile
export const getUserProfile = ({userId, accessToken}) => {
  return {
    type: actionLoginTypes.USER_PROFILE,
    userId, accessToken
  }
}

// get question for feedbacks
export const getQuestions = ({accessToken}) => {
  return {
    type: actionFeedbackTypes.QUESTIONS,
    accessToken
  }
}

//get feedback answers for organizers to view
export const getResponses = ({id, accessToken}) => {
  return {
    type: actionFeedbackTypes.RESPONSES,
    accessToken,
    id
  }
}

//submit reponse for feedbacks of subscriber 
export const postResponses = ({eventId, feedback, accessToken, callback}) => {
  return {
    type: actionFeedbackTypes.POST_QUESTIONS,
    event_id: eventId,
    feedback,
    accessToken, 
    callback
  }
}

//update user profile request
export const updateUserProfile = ({userId, data, accessToken, callback}) => {
  return {
    type: actionLoginTypes.UPDATE_USER_PROFILE,
    userId,
    data,
    accessToken,
    callback
  }
}

// fetch data for analytics dashboard
export const fetchAnalyticsData = ({accessToken, filterData}) => {
  return {
    type: actionAnalytics.GET_ANALYTICS,
    accessToken,
    filterData
  }
}

export const checkResponse = (response, responseJson) => {
  if (!response.ok) {
    throw responseJson;
  } else return;
};

export const ifAccessTokenExpired = (token) => {
  var decoded = jwt.decode(token, { complete: true });
  const currentTime = Math.floor(new Date().getTime() / 1000);
  if (decoded && currentTime > decoded.payload.exp) {
    localStorage.clear();
    window.location.replace("/login");
    return true;
  } else return false;
};

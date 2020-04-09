import { actionTypes, actionLoginTypes } from "../constants/actionTypes";

export const getClusters = id => {
  return {
    type: actionTypes.GET_CLUSTERS,
    id: id
  };
};

export const getUser = ({email,password,callback}) => {
  return {
    type: actionLoginTypes.GET_USER,
    email: email,
    password: password,
    callback: callback
  };
};

export const postUser = ({data,callback}) => {
  return {
    type: actionLoginTypes.POST_USER,
    data: data,
    callback: callback
  }
}
export const getVerificationCode = ({data,callback}) => {
  return {
    type: actionLoginTypes.GET_CODE,
    data: data,
    callback: callback
  }
}

export const postForgotPassword = ({data, callback}) => {
  return {
    type: actionLoginTypes.FORGOT_PASSWORD,
    data: data,
    callback: callback
  }
}
export const postChangePassword = ({data,accessToken, callback}) => {
  return {
    type: actionLoginTypes.CHANGE_PASSWORD,
    data: data,
    accessToken: accessToken,
    callback: callback,
  }
}

export const logOutUser = ({callback}) => {
  return {
    type: actionLoginTypes.LOGGING_OUT,
    callback: callback
  }
}

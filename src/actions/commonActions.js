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

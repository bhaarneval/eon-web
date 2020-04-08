import { actionTypes, actionLoginTypes } from "../constants/actionTypes";

export const getClusters = id => {
  return {
    type: actionTypes.GET_CLUSTERS,
    id: id
  };
};

export const getUser = id => {
  return {
    type: actionLoginTypes.GET_USER,
    id: id
  };
};

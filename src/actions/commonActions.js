import { actionTypes } from "../constants/actionTypes";

export const getClusters = id => {
  return {
    type: actionTypes.GET_CLUSTERS,
    id: id
  };
};

import { actionTypes } from "../constants/actionTypes";

const initialData = {
  cluster: null
};

const clusterReducer = (state = initialData, action) => {
  switch (action.type) {
    case actionTypes.GET_CLUSTERS:
      return {
        ...state
      };
      case actionTypes.CLUSTERS_RECIEVED:
        return {
          ...state,
          cluster: action.payload
        };
    default:
      return state;
  }
};
export default clusterReducer;

import { actionAnalytics } from "../constants/actionTypes";

const initialData = {
    fetchingData: false,
  analyticsData:{}
};

const analyticsReducer = (state = initialData, action) => {
  switch (action.type) {
    case actionAnalytics.FETCHING_ANALYTICS:
      return {
        ...state,
        fetchingData: !state.fetchingData
      };
    case actionAnalytics.ANALYTICS_RECIEVED:
        return {
            ...state,
            analyticsData: action.payload,
            fetchingData: false
        }
    default:
      return state;
  }
};
export default analyticsReducer;

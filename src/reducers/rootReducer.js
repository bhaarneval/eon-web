import clusterReducer from "./clusterReducer";
import { combineReducers } from "redux";

const appReducer = combineReducers({
  clusterReducer
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;

import clusterReducer from "./clusterReducer";
import userReducer from "./userReducer";
import { combineReducers } from "redux";

const appReducer = combineReducers({
  clusterReducer,
  userReducer,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;

import clusterReducer from "./clusterReducer";
import userReducer from "./userReducer";
import eventReducer from "./eventReducer";
import notificationReducer from "./notificationReducer";
import { combineReducers } from "redux";

const appReducer = combineReducers({
  clusterReducer,
  userReducer,
  eventReducer,
  notificationReducer
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;

import clusterReducer from "./clusterReducer";
import userReducer from "./userReducer";
import eventReducer from "./eventReducer";
import notificationReducer from "./notificationReducer";
import analyticsReducer from "./analyticsReducer"
import feedbackReducer from "./feedbackReducer";
import { combineReducers } from "redux";

const appReducer = combineReducers({
  clusterReducer,
  userReducer,
  eventReducer,
  notificationReducer,
  analyticsReducer,
  feedbackReducer,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;

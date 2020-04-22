import { all } from "redux-saga/effects";
import { clusterActionWatcher } from "./clusterSaga";
import { userActionWatcher } from "./userSaga";
import { eventActionWatcher } from "./eventSaga";
import {notificationsActionWatcher} from "./notificationSaga"
import {feedbackActionWatcher} from "./feedbackSaga"

/**
 * saga to yield all others
 */
export default function* rootSaga() {
  console.log("Root Saga Initialized");
  yield all([
    clusterActionWatcher(),
    userActionWatcher(),
    eventActionWatcher(),
    notificationsActionWatcher(),
    feedbackActionWatcher(),
  ]);
}

import { all } from "redux-saga/effects";
import { userActionWatcher } from "./userSaga";
import { eventActionWatcher } from "./eventSaga";
import {notificationsActionWatcher} from "./notificationSaga"
import {analyticsActionWatcher} from "./analyticsSaga";
import {feedbackActionWatcher} from "./feedbackSaga"

/**
 * saga to yield all others
 */
export default function* rootSaga() {
  yield all([
    userActionWatcher(),
    eventActionWatcher(),
    notificationsActionWatcher(),
    analyticsActionWatcher(),
    feedbackActionWatcher(),
  ]);
}

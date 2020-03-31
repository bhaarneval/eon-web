import { all } from "redux-saga/effects";
import { clusterActionWatcher } from "./clusterSaga";

/**
 * saga to yield all others
 */
export default function* rootSaga() {
  console.log("Root Saga Initialized");
  yield all([
    clusterActionWatcher(),
  ]);
}

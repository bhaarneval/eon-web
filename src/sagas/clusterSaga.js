import { put, takeLatest } from "redux-saga/effects";

import { APIService } from "../constants/APIConstant";
import { actionTypes } from "../constants/actionTypes";

/**
 * To fetch the list of clusters
 * @param {id: number} param
 */
export function* fetchCluster(param) {
  // console.log("Fetching Clusters", param.id);
  try {
    const getUrl = APIService.dev + param.id;
    const headers = {
      "Content-Type": "application/json",
    };
    const json = yield fetch(getUrl, {
      headers: headers,
      method: "GET"
    }).then(response => {
      return response.json();
    });
    yield put({ type: actionTypes.CLUSTERS_RECIEVED, payload: json });
  } catch (e) {
    // console.log("error while fetching", e);
  }
}

export function* clusterActionWatcher() {
  // console.log("Cluster Watcher");
  yield takeLatest(actionTypes.GET_CLUSTERS, fetchCluster);
}

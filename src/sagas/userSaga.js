import { put, takeLatest } from "redux-saga/effects";
import { browserHistory } from 'react-router';
// import { APIService } from "../constants/APIConstant";
import { actionLoginTypes } from "../constants/actionTypes";

export function* getUser(param) {
  console.log("Fetching users", param);
  try {
    // const getUrl = APIService.dev + param.id;
    // const headers = {
    //   "Content-Type": "application/json",
    // };
    // const json = yield fetch(getUrl, {
    //   headers: headers,
    //   method: "GET"
    // }).then(response => {
    //   return response.json();
    // });
    yield put({ 
        type: actionLoginTypes.USER_RECIEVED, 
        payload: {'access_token': 'sdfdsfsdf'} 
    });
    browserHistory.push("/dashboard");
  } catch (e) {
    // console.log("error while fetching", e);
  }
}

export function* userActionWatcher() {
  // console.log("Cluster Watcher");
  yield takeLatest(actionLoginTypes.GET_USER, getUser);
}

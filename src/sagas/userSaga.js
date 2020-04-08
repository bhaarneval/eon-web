import { put, takeLatest } from "redux-saga/effects";
import { browserHistory } from 'react-router';
// import { APIService } from "../constants/APIConstant";
// import { push } from 'react-router-redux';
import { actionLoginTypes } from "../constants/actionTypes";


const payload = {
  "data":{
    "access": "access_token",
     "refresh": "refresh_token",
     "user": {
              "user_id": 33,
              "email": "user18@gmail.com",
              "active_status": true,
              "name": null,
              "created_on": "2020-04-06T15:40:47.169999Z",
              "updated_on": "2020-04-06T15:40:47.171084Z",
              "contact_number": "9999911111",
              "organization": "Eventhigh",
              "address": "Bangalore",
              "role": {
                  "id": 1,
                  "role": "organizer"
              }
          }
  }
  }

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
        payload: payload.data
    });
    browserHistory.push("/dashboard");
    localStorage.setItem('token', 'qwertyuioiuytrewqwertyui');
  } catch (e) {
    console.log("error while fetching", e);
    yield put({ 
      type: actionLoginTypes.USER_ERROR, 
      error: e
  });
  }
}

export function* userActionWatcher() {
  // console.log("Cluster Watcher");
  yield takeLatest(actionLoginTypes.GET_USER, getUser);
}

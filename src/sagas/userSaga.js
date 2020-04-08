import { put, takeLatest } from "redux-saga/effects";
// import { browserHistory } from 'react-router';
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
  const {email,password,callback} = param;
  try {
    
    console.log(email);
    console.log(password);
    yield put({type: actionLoginTypes.SET_USER_FETCHING});
    //make API call  here.
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
    callback();
    localStorage.setItem('token', 'qwertyuioiuytrewqwertyui');
  } catch (e) {
    console.error("error while fetching", e);
    yield put({ 
      type: actionLoginTypes.USER_ERROR, 
      error: e
  });
    callback(e);
  }
}

export function* postUser(param) {
  const {data,callback} = param;
  try {
    console.log(data);
    yield put({type: actionLoginTypes.SET_USER_FETCHING});
    //make API call  here.
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
      callback();
    localStorage.setItem('token', 'qwertyuioiuytrewqwertyui');
  } catch (e) {
    console.error("error while post", e);
    yield put({ 
      type: actionLoginTypes.USER_ERROR, 
      error: e
  });
    callback(e);
  }
}

export function* getCode(param){
  const { data, callback } = param;
  try{
    console.log(data);
    yield put({type: actionLoginTypes.SET_USER_FETCHING});

    //make API call here

    yield put({type: actionLoginTypes.SET_USER_FETCHING});
    callback();
  }
  catch (e) {
    console.error("Error while getting verification code",e);
    yield put({
      type: actionLoginTypes.USER_ERROR,
      error: e
    });
    callback(e);
  }
}

export function* forgotPassword(param) {
  const {data, callback} =param;
  try{
    console.log(data);
    yield put({type: actionLoginTypes.SET_USER_FETCHING});

    //make API call here

    yield put({type: actionLoginTypes.SET_USER_FETCHING});
    callback();
  }
  catch (e) {
    console.error("Error while posting password change",e);
    yield put({
      type: actionLoginTypes.USER_ERROR,
      error: e
    });
    callback(e);
  } 
}

export function* changePassword(param) {
  const {data, callback} = param;
  try{
    console.log(data);
    yield put({type: actionLoginTypes.SET_USER_FETCHING});

    //Make API call here

    yield put({type: actionLoginTypes.SET_USER_FETCHING});
    callback();
  }
  catch (e) {
    console.error("Unable to change password", e);
    yield put({
      type: actionLoginTypes.USER_ERROR,
      error: e
    });
    callback(e);
  }
}

export function* userActionWatcher() {
  // console.log("Cluster Watcher");
  yield takeLatest(actionLoginTypes.GET_USER, getUser);
  yield takeLatest(actionLoginTypes.POST_USER, postUser);
  yield takeLatest(actionLoginTypes.GET_CODE, getCode);
  yield takeLatest(actionLoginTypes.FORGOT_PASSWORD, forgotPassword);
  yield takeLatest(actionLoginTypes.CHANGE_PASSWORD,changePassword);
}

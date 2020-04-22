import { put, takeLatest } from "redux-saga/effects";
import { APIService, requestURLS } from "../constants/APIConstant";
import { actionLoginTypes } from "../constants/actionTypes";
import {message} from "antd";

export function* logOut(param) {
  try {
    yield put({ type: actionLoginTypes.LOG_OUT });
    param.callback();
  } catch (e) {
    console.error("Unable to logout", e);
    yield put({
      type: actionLoginTypes.USER_ERROR,
      error: e,
    });
  }
}
export function* getUser(param) {
  const { email, password, callback } = param;
  let recievedResponse = {};
  try {
    yield put({ type: actionLoginTypes.SET_USER_FETCHING });

    const getUrl = APIService.dev + requestURLS.LOGIN;
    let headers = {
      "Content-Type": "application/json",
    };
    const responseJSON = yield fetch(getUrl, {
      headers: headers,
      method: "POST",
      body: JSON.stringify({ email, password }),
    }).then((response) => {
      recievedResponse = response;
      return response.json();
    });

    if (!recievedResponse.ok) {
      throw responseJSON;
    }

    let getEventTypeURL = APIService.dev+requestURLS.GET_EVENT_TYPES;
    headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${responseJSON.data.access}`
    };
    let eventType = yield fetch (getEventTypeURL,{
      headers: headers,
      method: "GET",
    }).then(response=>{
      recievedResponse = response;
      return response.json();
    });
    if(!recievedResponse.ok){
      throw responseJSON;
    }
    yield put({type:actionLoginTypes.GET_EVENT_TYPE, payload: eventType.data});

    yield put({
      type: actionLoginTypes.USER_RECIEVED,
      payload: responseJSON.data,
    });

    callback('success', responseJSON.data);
    localStorage.setItem("token", responseJSON.data.access);
  } catch (e) {
    console.error("error while fetching", e);
    yield put({
      type: actionLoginTypes.USER_ERROR,
      error: e,
    });
    callback('error', e.message);
  }
}

export function* postUser(param) {
  const { data, callback } = param;
  try {
    let recievedResponse = {};
    yield put({ type: actionLoginTypes.SET_USER_FETCHING });

    const getUrl = APIService.dev + requestURLS.REGISTER;
    let headers = {
      "Content-Type": "application/json",
    };
    const responseJSON = yield fetch(getUrl, {
      headers: headers,
      method: "POST",
      body: JSON.stringify(data),
    }).then((response) => {
      recievedResponse = response;
      return response.json();
    });
    if (!recievedResponse.ok) {
      throw responseJSON;
    }

    let getEventTypeURL = APIService.dev+requestURLS.GET_EVENT_TYPES;
    headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${responseJSON.data.access}`
    };
    let eventType = yield fetch (getEventTypeURL,{
      headers: headers,
      method: "GET",
    }).then(response=>{
      recievedResponse = response;
      return response.json();
    });
    if(!recievedResponse.ok){
      throw responseJSON;
    }
    yield put({type:actionLoginTypes.GET_EVENT_TYPE, payload: eventType.data});

    yield put({
      type: actionLoginTypes.USER_RECIEVED,
      payload: responseJSON.data,
    });
    callback();
    localStorage.setItem("token", responseJSON.data.access);
  } catch (e) {
    console.error("error while post", e);
    yield put({
      type: actionLoginTypes.USER_ERROR,
      error: e,
    });
    callback(e.message);
  }
}

export function* getCode(param) {
  const { data, callback } = param;
  try {
    let recievedResponse = {};
    yield put({ type: actionLoginTypes.SET_USER_FETCHING });

    //make API call here
    const getUrl = APIService.dev + requestURLS.GENERATE_CODE;
    const headers = {
      "Content-Type": "application/json",
    };
    let responseJSON = yield fetch(getUrl, {
      headers: headers,
      method: "POST",
      body: JSON.stringify(data),
    }).then((response) => {
      recievedResponse = response;
      return response.json();
    });
    if (!recievedResponse.ok) {
      throw responseJSON;
    }
    yield put({ type: actionLoginTypes.SET_USER_FETCHING });
    callback();
  } catch (e) {
    console.error("Error while getting verification code", e);
    yield put({
      type: actionLoginTypes.USER_ERROR,
      error: e,
    });
    callback(e.message);
  }
}

export function* forgotPassword(param) {
  const { data, callback } = param;
  try {
    let recievedResponse = {};
    console.log(data);
    yield put({ type: actionLoginTypes.SET_USER_FETCHING });

    const getUrl = APIService.dev + requestURLS.RESET_PASSWORD;
    const headers = {
      "Content-Type": "application/json",
    };

    let responseJSON = yield fetch(getUrl, {
      headers: headers,
      method: "POST",
      body: JSON.stringify(data),
    }).then((response) => {
      recievedResponse = response;
      return response.json();
    });

    if (!recievedResponse.ok) {
      throw responseJSON;
    }

    yield put({ type: actionLoginTypes.SET_USER_FETCHING });
    callback();
  } catch (e) {
    console.error("Error while posting password change", e);
    yield put({
      type: actionLoginTypes.USER_ERROR,
      error: e,
    });
    callback(e.message);
  }
}

export function* changePassword(param) {
  const { data, callback, accessToken } = param;
  try {
    let recievedResponse = {};
    yield put({ type: actionLoginTypes.SET_USER_FETCHING });

    const getUrl = APIService.dev + requestURLS.CHANGE_PASSWORD;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };

    let responseJSON = yield fetch(getUrl, {
      headers: headers,
      method: "POST",
      body: JSON.stringify({
        email: data.email,
        old_password: data.oldPassword,
        new_password: data.newPassword,
      }),
    }).then((response) => {
      recievedResponse = response;
      return response.json();
    });

    if (!recievedResponse.ok) {
      throw responseJSON;
    }

    yield put({ type: actionLoginTypes.SET_USER_FETCHING });
    callback();
  } catch (e) {
    console.error("Unable to change password", e);
    yield put({
      type: actionLoginTypes.USER_ERROR,
      error: e,
    });
    callback(e.message);
  }
}

export function* fetchUserProfile(param){
  const {userId, accessToken } = param;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };
  try {
    yield put({type: actionLoginTypes.SET_USER_FETCHING});
    let getURL = APIService.dev + requestURLS.USER_OPERATIONS+`${userId}/`;
    let responseObject = {};
    let responseJson = yield fetch(getURL, {
      headers: headers,
      method: "GET",
    }).then(response => {
      responseObject = response;
      return response.json();
    });

    if(!responseObject.ok) {
      throw responseJson;
    }

    yield put({type: actionLoginTypes.FETCHED_USER_PROFILE, payload: responseJson.data});
  }catch (e) {
    console.error("Unable to change password", e);
    yield put({
      type: actionLoginTypes.USER_ERROR,
      error: e,
    });
    message.error(e.message);
  }
}

export function* updateUser(param){
  const {userId, data, accessToken, callback } = param;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };
  try {
    yield put({type: actionLoginTypes.SET_USER_FETCHING});
    let updateUrl = APIService.dev + requestURLS.USER_OPERATIONS+`${userId}/`;
    let responseObject = {};
    let responseJson = yield fetch(updateUrl, {
      headers: headers,
      method: "PATCH",
      body: JSON.stringify(data),
    }).then(response => {
      responseObject = response;
      return response.json();
    });

    if(!responseObject.ok) {
      throw responseJson;
    }

    yield put({type: actionLoginTypes.FETCHED_USER_PROFILE, payload: responseJson.data});
    callback();
    message.success("Profile updated succesfully"); 
  }catch (e) {
    console.error("Unable to change password", e);
    yield put({
      type: actionLoginTypes.USER_ERROR,
      error: e,
    });
    message.error("Cannot execute your request at the moment!");
  }
}

export function* userActionWatcher() {
  // console.log("Cluster Watcher");
  yield takeLatest(actionLoginTypes.LOGGING_OUT, logOut);
  yield takeLatest(actionLoginTypes.GET_USER, getUser);
  yield takeLatest(actionLoginTypes.POST_USER, postUser);
  yield takeLatest(actionLoginTypes.GET_CODE, getCode);
  yield takeLatest(actionLoginTypes.FORGOT_PASSWORD, forgotPassword);
  yield takeLatest(actionLoginTypes.CHANGE_PASSWORD, changePassword);
  yield takeLatest(actionLoginTypes.USER_PROFILE, fetchUserProfile);
  yield takeLatest(actionLoginTypes.UPDATE_USER_PROFILE, updateUser);
}

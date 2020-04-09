import { put, takeLatest } from "redux-saga/effects";
import { APIService, requestURLS } from "../constants/APIConstant";
import { actionLoginTypes } from "../constants/actionTypes";

export function* logOut(param){
  try{
    yield put({type: actionLoginTypes.LOG_OUT});
    param.callback();
  }
  catch(e){
    console.error("Unable to logout", e);
    yield put({
      type: actionLoginTypes.USER_ERROR,
      error: e,
    });
  }
}
export function* getUser(param) {
  const { email, password, callback } = param;
  try {
    yield put({ type: actionLoginTypes.SET_USER_FETCHING });

    const getUrl = APIService.dev + requestURLS.LOGIN;
    const headers = {
      "Content-Type": "application/json",
    };
    const responseJSON = yield fetch(getUrl, {
      headers: headers,
      method: "POST",
      body: JSON.stringify({ email, password }),
    }).then((response) => {
      return response.json();
    });

    yield put({
      type: actionLoginTypes.USER_RECIEVED,
      payload: responseJSON.data,
    });

    callback();
    localStorage.setItem("token", responseJSON.data.access);
  } catch (e) {
    console.error("error while fetching", e);
    yield put({
      type: actionLoginTypes.USER_ERROR,
      error: e,
    });
    callback(e.message);
  }
}

export function* postUser(param) {
  const { data, callback } = param;
  try {
    yield put({ type: actionLoginTypes.SET_USER_FETCHING });

    const getUrl = APIService.dev + requestURLS.REGISTER;
    const headers = {
      "Content-Type": "application/json",
    };
    const responseJSON = yield fetch(getUrl, {
      headers: headers,
      method: "POST",
      body: JSON.stringify(data),
    }).then((response) => {
      return response.json();
    });

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
    yield put({ type: actionLoginTypes.SET_USER_FETCHING });
    
    //make API call here
    const getUrl = APIService.dev + requestURLS.GENERATE_CODE;
    const headers = {
      "Content-Type": "application/json",
    };
    yield fetch(getUrl, {
      headers: headers,
      method: "POST",
      body: JSON.stringify(data),
    }).then((response) => {
      return response.json();
    });

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
    console.log(data);
    yield put({ type: actionLoginTypes.SET_USER_FETCHING });

    const getUrl = APIService.dev + requestURLS.RESET_PASSWORD;
    const headers = {
      "Content-Type": "application/json",
    };

    yield fetch(getUrl, {
      headers: headers,
      method: "POST",
      body: JSON.stringify(data),
    }).then((response) => {
      return response.json();
    });

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
    yield put({ type: actionLoginTypes.SET_USER_FETCHING });

    const getUrl = APIService.dev + requestURLS.CHANGE_PASSWORD;
    const headers = {
      "Content-Type": "application/json",
      "Bearer": accessToken,
    };

    yield fetch(getUrl, {
      headers: headers,
      method: "POST",
      body: JSON.stringify(data),
    }).then((response) => {
      return response.json();
    });

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

export function* userActionWatcher() {
  // console.log("Cluster Watcher");
  yield takeLatest(actionLoginTypes.LOGGING_OUT, logOut);
  yield takeLatest(actionLoginTypes.GET_USER, getUser);
  yield takeLatest(actionLoginTypes.POST_USER, postUser);
  yield takeLatest(actionLoginTypes.GET_CODE, getCode);
  yield takeLatest(actionLoginTypes.FORGOT_PASSWORD, forgotPassword);
  yield takeLatest(actionLoginTypes.CHANGE_PASSWORD, changePassword);
}

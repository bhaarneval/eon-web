import { put, takeLatest } from "redux-saga/effects";
import { APIService, requestURLS } from "../constants/APIConstant";
import { actionNotificationsTypes } from "../constants/actionTypes";
import {checkResponse, ifAccessTokenExpired} from "../actions/commonActions";


export function* getNotifications(param) {
  if(ifAccessTokenExpired(param.access)){
    return;
  }
  try {
    let getNotificationsURL = APIService.dev+requestURLS.GET_NOTIFICATIONS_URL;
    let headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${param.access}`
    };
    let responseObject = {};
    let eventType = yield fetch (getNotificationsURL,{
      headers: headers,
      method: "GET",
    }).then(response=>{
      responseObject = response;
      return response.json();
    });

    checkResponse(responseObject, eventType);

    yield put({
      type: actionNotificationsTypes.NOTIFICATIONS_RECIEVED,
      payload: eventType.data,
    });
  } catch (e) {
    console.error("error while fetching", e);
    yield put({
      type: actionNotificationsTypes.NOTIFICATIONS_ERROR,
      error: e,
    });
  }
}

export function* readNotifications(param) {
  const { list, access } = param;
  if(ifAccessTokenExpired(access)){
    return;
  }
  try {
    let recievedResponse = {};
    let readNotificationsURL = APIService.dev+requestURLS.READ_NOTIFICATIONS_URL;
    let headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${param.access}`
    };
    let responseJSON = yield fetch (readNotificationsURL,{
      headers: headers,
      method: "PATCH",
      body: JSON.stringify(list),
    }).then((response) => {
      recievedResponse = response;
      return response.json();
    });

    checkResponse(recievedResponse, responseJSON);

    let getNotificationsURL = APIService.dev+requestURLS.GET_NOTIFICATIONS_URL;

    let eventType = yield fetch (getNotificationsURL,{
      headers: headers,
      method: "GET",
    }).then(response=>{
      recievedResponse = response;
      return response.json();
    });

    checkResponse(recievedResponse, responseJSON);
    
    yield put({
      type: actionNotificationsTypes.NOTIFICATIONS_RECIEVED,
      payload: eventType.data,
    });
  } catch (e) {
    yield put({
      type: actionNotificationsTypes.NOTIFICATIONS_READ_ERROR,
      error: e,
    });
  }
}

export function* notificationsActionWatcher() {
  yield takeLatest(actionNotificationsTypes.GET_NOTIFICATIONS, getNotifications);
  yield takeLatest(actionNotificationsTypes.READ_NOTIFICATIONS, readNotifications);
}

import { put, takeLatest } from "redux-saga/effects";
import { APIService, requestURLS } from "../constants/APIConstant";
import { actionNotificationsTypes } from "../constants/actionTypes";

/**
 * fetch new notifications
 * @param {accessToken} param
 * accessToken for authorisation
 */
export function* getNotifications(param) {
  try {
    let getNotificationsURL = APIService.dev+requestURLS.GET_NOTIFICATIONS_URL;
    let headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${param.access}`
    };
    let eventType = yield fetch (getNotificationsURL,{
      headers: headers,
      method: "GET",
    }).then(response=>{
      return response.json();
    });
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

/**
 * mark notification as read
 * @param {accessToken, list} param
 * accessToken for authorisation
 * list: list of ids of notifications to mark as read
 */
export function* readNotifications(param) {
  const { list } = param;
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
    if (!recievedResponse.ok) {
      throw responseJSON;
    }

    let getNotificationsURL = APIService.dev+requestURLS.GET_NOTIFICATIONS_URL;

    let eventType = yield fetch (getNotificationsURL,{
      headers: headers,
      method: "GET",
    }).then(response=>{
      recievedResponse = response;
      return response.json();
    });

    if (!recievedResponse.ok) {
      throw responseJSON;
    }
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

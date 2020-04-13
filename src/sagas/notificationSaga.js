import { put, takeLatest } from "redux-saga/effects";
import { APIService, requestURLS } from "../constants/APIConstant";
import { actionNotificationsTypes } from "../constants/actionTypes";


export function* getNotifications(param) {
  const { id } = param;
  console.log(id)
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

export function* notificationsActionWatcher() {
  yield takeLatest(actionNotificationsTypes.GET_NOTIFICATIONS, getNotifications);
}

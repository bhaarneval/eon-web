import { put, takeLatest } from "redux-saga/effects";

import { APIService, requestURLS } from "../constants/APIConstant";
import { actionAnalytics } from "../constants/actionTypes";
import { message } from "antd";
import {checkResponse} from "../actions/commonActions"

export function* getAnalyticsData(param) {
  const { accessToken, filterData } = param;
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  let params = {};
  if (filterData.searchText) {
    params = { ...params, search: filterData.searchText };
  }
  if (filterData.status) {
    params = {
      ...params,
      event_status: filterData.status,
    };
  }
  try {

    yield put({ type: actionAnalytics.FETCHING_ANALYTICS });
    let getUrl = APIService.dev + requestURLS.ANALYTICS;
    getUrl = Object.keys(params).reduce((accu, current, index) => {
        const prefix = index === 0 ? '?' : '&';
        return accu + prefix + current + '=' + params[current];
    }, getUrl);
    let responseObject = {};
    const responseJson = yield fetch(getUrl, {
      headers: headers,
      method: "GET",
    }).then((response) => {
      responseObject = response;
      return response.json();
    });

    checkResponse(responseObject, responseJson);

    yield put({
      type: actionAnalytics.ANALYTICS_RECIEVED,
      payload: responseJson.data,
    });
  } catch (e) {
    yield put({ type: actionAnalytics.FETCHING_ANALYTICS });
    message.error(e.message);
  }
}

export function* analyticsActionWatcher() {
  yield takeLatest(actionAnalytics.GET_ANALYTICS, getAnalyticsData);
}

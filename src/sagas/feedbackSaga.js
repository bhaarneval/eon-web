import { put, takeLatest } from "redux-saga/effects";
import { APIService, requestURLS } from "../constants/APIConstant";
import { actionFeedbackTypes } from "../constants/actionTypes";
import {message} from "antd";

export function* fetchQuestions(param){
  const {accessToken } = param;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };
  try {
    yield put({type: actionFeedbackTypes.SET_QUESTIONS_FETCHING});
    let getURL = APIService.dev + requestURLS.FEEDBACK_OPERATIONS;
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

    yield put({type: actionFeedbackTypes.FETCHED_QUESTIONS, payload: responseJson.data});
  }catch (e) {
    console.error("Unable to change password", e);
    yield put({
      type: actionFeedbackTypes.QUESTIONS_ERROR,
      error: e,
    });
    message.error(e.message);
  }
}


export function* feedbackActionWatcher() {
  // console.log("Cluster Watcher");
  yield takeLatest(actionFeedbackTypes.QUESTIONS, fetchQuestions);
}

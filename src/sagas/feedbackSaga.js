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

export function* fetchResponses(param){
  const {accessToken, id } = param;
  console.log(param, id)
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };
  try {
    let getURL = APIService.dev + requestURLS.FEEDBACK_POST + `?event_id=${id}`;
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
    yield put({type: actionFeedbackTypes.FETCHED_RESPONSES, payload: responseJson.data});
  }catch (e) {
    console.error("Unable to change password", e);
    yield put({
      type: actionFeedbackTypes.RESPONSES_ERROR,
      error: e,
    });
    message.error(e.message);
  }
}

export function* postQuestions(param){
  const {accessToken, event_id, feedback} = param;
  console.log(event_id, feedback, 'dasdasda')
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };
  try {
    let getURL = APIService.dev + requestURLS.FEEDBACK_POST;
    let responseObject = {};
    let responseJson = yield fetch(getURL, {
      headers: headers,
      method: "POST",
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
  yield takeLatest(actionFeedbackTypes.POST_QUESTIONS, postQuestions);
  yield takeLatest(actionFeedbackTypes.RESPONSES, fetchResponses);
}

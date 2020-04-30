import { put, takeLatest } from "redux-saga/effects";
import { APIService, requestURLS } from "../constants/APIConstant";
import { actionFeedbackTypes, actionEventTypes } from "../constants/actionTypes";
import { message } from "antd";
import cloneDeep from 'lodash/cloneDeep'

export function* fetchQuestions(param) {
  const { accessToken } = param;
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
    }).then((response) => {
      responseObject = response;
      return response.json();
    });

    if (!responseObject.ok) {
      throw responseJson;
    }

    yield put({
      type: actionFeedbackTypes.FETCHED_QUESTIONS,
      payload: responseJson.data,
    });
  } catch (e) {
    yield put({
      type: actionFeedbackTypes.QUESTIONS_ERROR,
      error: e,
    });
    message.error(e.message);
  }
}

export function* fetchResponses(param){
  const {accessToken, id } = param;
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
    yield put({
      type: actionFeedbackTypes.QUESTIONS_ERROR,
      error: e,
    });
    message.error(e.message);
  }
}

export function* postQuestions(param) {
  let { accessToken, feedback, callback } = param;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };
  try {
    let feedbackList = cloneDeep(feedback.feedback);
    for (let i = 0; i < feedbackList.length; ++i) {

      if (feedbackList[i].answer.image) {
        let imageFile = feedbackList[i].answer.image;
        let postUrl = APIService.dev + requestURLS.UPLOAD_IMAGE;
        let responseObject = {};
        let responseJson = yield fetch(postUrl, {
          headers: headers,
          method: "POST",
          body: JSON.stringify({
            path_name: imageFile.name,
          }),
        }).then((response) => {
          responseObject = response;
          return response.json();
        });
        if (!responseObject.ok) {
          throw responseJson;
        }

        let s3Url = responseJson.data.presigned_url;
        yield fetch(s3Url, {
          method: "PUT",
          body: imageFile,
        }).then((response) => {
          responseObject = response;
        });
        if (!responseObject.ok) {
          throw { message: "Something went wrong" };
        }

        feedbackList[i].answer.image = responseJson.data.image_name;
      }
    }

    feedback.feedback = feedbackList;

    let postUrl = APIService.dev+requestURLS.FEEDBACK_POST;
    let responseObject = {};
    let responseJson = yield fetch(postUrl, {
      headers: headers,
      method: "POST",
      body: JSON.stringify(feedback)
    }).then(response => {
      responseObject = response;
      return response.json();
    });
    if(!responseObject.ok){
      throw responseJson;
    }
    yield put({type:actionEventTypes.SET_EVENT_FETCHING})
    let getURL = APIService.dev + requestURLS.EVENT_OPERATIONS + `${feedback.event_id}/`;
    responseJson = yield fetch(getURL, {
      headers: headers,
      method: "GET",
    }).then((response) => {
      responseObject = response;
      return response.json();
    });

    if(!responseObject.ok){
      throw responseJson;
    }

    yield put({
      type: actionEventTypes.RECEIVED_EVENT_DATA,
      payload: responseJson.data,
    });

    yield put({type:actionFeedbackTypes.SUBMITTED_QUESTIONS});
    message.success("Feedback submitted successfully");
    callback(true);
  } catch (e) {
    yield put({
      type: actionFeedbackTypes.QUESTIONS_ERROR,
      error: e,
    });
    message.error(e.message);
  }
}

export function* feedbackActionWatcher() {
  yield takeLatest(actionFeedbackTypes.QUESTIONS, fetchQuestions);
  yield takeLatest(actionFeedbackTypes.POST_QUESTIONS, postQuestions);
  yield takeLatest(actionFeedbackTypes.RESPONSES, fetchResponses);
}

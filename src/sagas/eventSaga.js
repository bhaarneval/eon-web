import { put, takeLatest } from "redux-saga/effects";
import { APIService, requestURLS } from "../constants/APIConstant";
import { actionEventTypes } from "../constants/actionTypes";

function checkResponse(response,responseJson) {
  if (!response.ok) {
    throw responseJson;
  } else return;
}

export function* createNewEvent(param) {
  let { data, callback, accessToken } = param;
  try {
    yield put({ type: actionEventTypes.SET_EVENT_FETCHING });
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      };
    let imageUploadResponse = {};
    // to upload image
    // if (data.images.file && data.images.file.name) {
    //   let responseImage = {};
    //   let getPresignedUrl = APIService + requestURLS.UPLOAD_IMAGE;
    
    //   imageUploadResponse = yield fetch(getPresignedUrl, {
    //     headers: headers,
    //     method: "POST",
    //     body: JSON.stringify({
    //       name: data.image.file.name,
    //     }),
    //   }).then((response) => {
    //     responseImage = response;
    //     return response.json();
    //   });

    //   checkResponse(responseImage, imageUploadResponse); 

    //   let responseJson = yield fetch(imageUploadResponse.data.presigned, {
    //     method: "POST",
    //     body: JSON.stringify({
    //       name: data.image.file.name,
    //     }),
    //   }).then((response) => {
    //     responseImage = response;
    //     return response.json();
    //   });

    //   checkResponse(responseImage, responseJson);
    // }

    let postURL = APIService.dev + requestURLS.CREATE_EVENT;
    data.images = imageUploadResponse.image_name || "undefined";
    let recievedResponse = {};
    const responseJson = yield fetch(postURL, {
      headers: headers,
      method: "POST",
      body: JSON.stringify(data),
    }).then((response) => {
      recievedResponse = response;
      return response.json();
    });
    checkResponse(recievedResponse,responseJson);

    yield put({
      type: actionEventTypes.RECEIVED_EVENT_DATA,
      payload: responseJson,
    });
    callback({ id: responseJson.id });
  } catch (e) {
    console.error(e);
    yield put({
      type: actionEventTypes.EVENT_ERROR,
      error: e,
    });
    callback({ error: e.message });
  }
}

export function* eventActionWatcher() {
  yield takeLatest(actionEventTypes.CREATE_EVENT, createNewEvent);
}

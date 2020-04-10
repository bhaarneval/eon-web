import { put, takeLatest } from "redux-saga/effects";
import { APIService, requestURLS } from "../constants/APIConstant";
import { actionEventTypes } from "../constants/actionTypes";

function checkResponse(response,responseJson) {
  if (!response.ok) {
    throw responseJson;
  } else return;
}
const accessToken = localStorage.getItem("token");

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

    let postURL = APIService.dev + requestURLS.EVENT_OPERATIONS;
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

export function* fetchEventsList(param){
    const {userData} = param;
    const headers = {
        Authorization:`Bearer ${accessToken}`,
    }
    let queryParam="";
    if(userData.role.role === "subscriber"){
        queryParam = `?user_id=${userData.user_id}`;
    }
        
    try{
        yield put({type:actionEventTypes.SET_EVENT_FETCHING});
        const getURL = APIService.dev+requestURLS.EVENT_OPERATIONS+queryParam;
        let responseObject = {};
        const responseJson = yield fetch(getURL, {
            headers: headers,
            method: "GET",
        }).then(response => {
            responseObject = response;
            return response.json();
        });

        checkResponse(responseObject,responseJson);

        yield put({type:actionEventTypes.RECEIVED_EVENT_LIST, payload:responseJson.data});
    } catch (e) {
        console.error(e);
        yield put({type: actionEventTypes.EVENT_ERROR, error: e});
    }

}

export function* eventActionWatcher() {
  yield takeLatest(actionEventTypes.CREATE_EVENT, createNewEvent);
  yield takeLatest(actionEventTypes.GET_EVENT_LIST, fetchEventsList);
}

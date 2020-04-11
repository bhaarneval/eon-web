import { put, takeLatest } from "redux-saga/effects";
import { APIService, requestURLS } from "../constants/APIConstant";
import { actionEventTypes } from "../constants/actionTypes";

function checkResponse(response,responseJson) {
  if (!response.ok) {
    throw responseJson;
  } else return;
}

export function* createNewEvent(param) {
  let { data, callback, eventId,accessToken } = param;
  try {
    yield put({ type: actionEventTypes.SET_EVENT_FETCHING });
    const method = eventId?"PATCH":"POST";
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
    
    let postURL = "";
    if(!eventId){
        postURL = APIService.dev + requestURLS.EVENT_OPERATIONS;
    }
    else
        postURL = APIService.dev + requestURLS.EVENT_OPERATIONS+`${eventId}/`
    data.images = imageUploadResponse.image_name || "undefined";
    let recievedResponse = {};
    const responseJson = yield fetch(postURL, {
      headers: headers,
      method: method,
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
    const {userData, accessToken} = param;
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

export function* fetchEventData(param) {
    const {eventId, accessToken, userRole, callback} = param;
    const headers = {
        Authorization:`Bearer ${accessToken}`,
    }
    try{
        yield put({type:actionEventTypes.SET_EVENT_FETCHING});
        const getURL = APIService.dev+requestURLS.EVENT_OPERATIONS+`${eventId}/`;
        let responseObject = {};
        const responseJson = yield fetch(getURL, {
            headers: headers,
            method: "GET",
        }).then(response => {
            responseObject = response;
            return response.json();
        });

        checkResponse(responseObject,responseJson);

        yield put({type:actionEventTypes.RECEIVED_EVENT_DATA, payload:userRole==="organiser"?responseJson.data[0]
        :responseJson.data});
        callback();
    } catch (e) {
        console.error(e);
        yield put({type: actionEventTypes.EVENT_ERROR, error: e});
        callback(e.message);
    }

}

export function* saveInvitees(param) {
    const {accessToken, data} = param;
    const headers = {
        "Content-Type": "application/json",
        Authorization:`Bearer ${accessToken}`,
    } 
    try{
        yield put({type:actionEventTypes.SET_EVENT_FETCHING});
        let getURL = APIService.dev+requestURLS.INVITEE_LIST;
        let responseObject = {};
        let responseJson = yield fetch(getURL, {
            headers: headers,
            method: "POST",
            body: JSON.stringify(data),
        }).then(response => {
            responseObject = response;
            return response.json();
        });

        checkResponse(responseObject,responseJson);
        
        yield put({type: actionEventTypes.UPDATE_INVITEE, payload:responseJson.data.invitee_list})
    } catch (e) {
        console.error(e);
        yield put({type: actionEventTypes.EVENT_ERROR, error: e});
    }
}

export function* eventActionWatcher() {
  yield takeLatest(actionEventTypes.CREATE_EVENT, createNewEvent);
  yield takeLatest(actionEventTypes.GET_EVENT_LIST, fetchEventsList);
  yield takeLatest(actionEventTypes.GET_EVENT_DATA, fetchEventData);
  yield takeLatest(actionEventTypes.SAVE_INVITEE, saveInvitees);
}

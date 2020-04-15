import { put, takeLatest } from "redux-saga/effects";

import { APIService, requestURLS } from "../constants/APIConstant";
import {message} from "antd";
import { actionEventTypes, actionSubscription } from "../constants/actionTypes";

function checkResponse(response, responseJson) {
  if (!response.ok) {
    throw responseJson;
  } else return;
}

export function* createNewEvent(param) {
  let { data, callback, eventId, accessToken } = param;
  try {
    yield put({ type: actionEventTypes.SET_EVENT_FETCHING });
    const method = eventId ? "PATCH" : "POST";
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };
    let imageUploadResponse = {};
    // to upload image
    if (data.imageFile && data.imageFile.name) {
      let responseImage = {};
      let getPresignedUrl = APIService.dev + requestURLS.UPLOAD_IMAGE;

      imageUploadResponse = yield fetch(getPresignedUrl, {
        headers: headers,
        method: "POST",
        body: JSON.stringify({
          path_name: data.imageFile.name,
        }),
      }).then((response) => {
        responseImage = response;
        return response.json();
      });

      checkResponse(responseImage, imageUploadResponse);
      
      yield fetch(imageUploadResponse.data.presigned_url, {
        method: "PUT",
        body: data.imageFile,
      }).then((response) => {
        responseImage = response;
      });

      checkResponse(responseImage,{message:"Something went wrong"});
    }

    let postURL = "";
    if (!eventId) {
      postURL = APIService.dev + requestURLS.EVENT_OPERATIONS;
    } else
      postURL = APIService.dev + requestURLS.EVENT_OPERATIONS + `${eventId}/`;
      let {name, external_links, location, date, time, subscription_fee, event_type, no_of_tickets, description, event_created_by} =data;
      let sendData = {name, external_links, location, date, time, subscription_fee, event_type, no_of_tickets, description, event_created_by};
      if(data.imageFile.name){
        sendData.images = imageUploadResponse.data?imageUploadResponse.data.image_name:""||"";
      }
    
    let recievedResponse = {};
    let responseJson = yield fetch(postURL, {
      headers: headers,
      method: method,
      body: JSON.stringify(sendData),
    }).then((response) => {
      recievedResponse = response;
      return response.json();
    });
    checkResponse(recievedResponse, responseJson);

    if (eventId) {
      let getURL =
        APIService.dev + requestURLS.EVENT_OPERATIONS + `${eventId}/`;
      responseJson = yield fetch(getURL, {
        headers: headers,
        method: "GET",
      }).then((response) => {
        recievedResponse = response;
        return response.json();
      });

      checkResponse(recievedResponse, responseJson);
      yield put({
        type: actionEventTypes.RECEIVED_EVENT_DATA,
        payload: responseJson.data[0],
      });
      callback({ id: responseJson.data[0].id });
    } else {
      yield put({
        type: actionEventTypes.RECEIVED_EVENT_DATA,
        payload: responseJson,
      });
      callback({ id: responseJson.id });
    }
  } catch (e) {
    console.error(e);
    yield put({
      type: actionEventTypes.EVENT_ERROR,
      error: e,
    });
    callback({ error: e.message });
  }
}

export function* fetchEventsList(param) {
  const {  accessToken,filterData } = param;
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  
let params = {};
if(filterData.type){
  params = {...params, event_type:filterData.type}
}
if(filterData.startDate && filterData.endDate)
  params = {...params, start_date:filterData.startDate,end_date:filterData.endDate}
if(filterData.search)
  params = {...params, search: filterData.search}
if(filterData.event_created_by)
  params = {...params, event_created_by: filterData.event_created_by}
if(filterData.is_wishlisted)
  params = {...params, is_wishlisted:filterData.is_wishlisted}
  try {
    yield put({ type: actionEventTypes.SET_EVENT_FETCHING });
    let getURL = APIService.dev + requestURLS.EVENT_OPERATIONS;
    getURL = Object.keys(params).reduce((accu, current, index) => {
      const prefix = index === 0 ? '?' : '&';
      return accu + prefix + current + '=' + params[current];
  }, getURL);
    let responseObject = {};
    const responseJson = yield fetch(getURL, {
      headers: headers,
      method: "GET",
    }).then((response) => {
      responseObject = response;
      return response.json();
    });

    checkResponse(responseObject, responseJson);

    yield put({
      type: actionEventTypes.RECEIVED_EVENT_LIST,
      payload: responseJson.data,
    });

    yield put({type: actionEventTypes.SET_EVENT_UPDATE, payload: false});
  } catch (e) {
    console.error(e);
    yield put({ type: actionEventTypes.EVENT_ERROR, error: e });
  }
}

export function* fetchEventData(param) {
  const { eventId, accessToken, callback, ifUpdate } = param;
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  try {
    yield put({ type: actionEventTypes.SET_EVENT_FETCHING });
    const getURL =
      APIService.dev + requestURLS.EVENT_OPERATIONS + `${eventId}/`;
    let responseObject = {};
    const responseJson = yield fetch(getURL, {
      headers: headers,
      method: "GET",
    }).then((response) => {
      responseObject = response;
      return response.json();
    });

    checkResponse(responseObject, responseJson);

    yield put({
      type: actionEventTypes.RECEIVED_EVENT_DATA,
      payload: responseJson.data,
    });

    if(ifUpdate){
      yield put({type: actionEventTypes.SET_EVENT_UPDATE, payload:true})
    }
    callback();
  } catch (e) {
    console.error(e);
    yield put({ type: actionEventTypes.EVENT_ERROR, error: e });
    callback(e.message);
  }
}

export function* deleteEvent(param) {
  const {message, accessToken, eventId, callback} = param;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };

  try{
    yield put({type:actionEventTypes.SET_EVENT_FETCHING});

    const deleteURL = APIService.dev+requestURLS.EVENT_OPERATIONS+`${eventId}/`;
    let responseObject = {};
    let responseJSON = yield fetch(deleteURL,{
      headers: headers,
      method: "DELETE",
      body: JSON.stringify({message:message})
    }).then(response => {
      responseObject = response;
      return response.json();
    });

    checkResponse(responseObject,responseJSON);

    callback();
  }catch(e) {
    console.error(e);
    yield put({ type: actionEventTypes.EVENT_ERROR, error: e });
    callback(e.message);
  }
}

export function* saveInvitees(param) {
  const { accessToken, data, updateType } = param;
  const eventId = data.event;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };
  try {
    yield put({ type: actionEventTypes.SET_EVENT_FETCHING });
    let getURL = APIService.dev + requestURLS.INVITEE_LIST;
    let responseObject = {};
    let responseJson = {};
    if (updateType === "save") {
      responseJson = yield fetch(getURL, {
        headers: headers,
        method: "POST",
        body: JSON.stringify(data),
      }).then((response) => {
        responseObject = response;
        return response.json();
      });
      checkResponse(responseObject, responseJson);
    } else {
      data.event_id = data.event;
      delete data.event;
      yield fetch(getURL, {
        headers: headers,
        method: "DELETE",
        body: JSON.stringify(data),
      }).then((response) => {
        responseObject = response;
      });
      checkResponse(responseObject, { message: "Something went wrong" });
    }

    getURL = APIService.dev + requestURLS.EVENT_OPERATIONS + `${eventId}/`;
    responseJson = yield fetch(getURL, {
      headers: headers,
      method: "GET",
    }).then((response) => {
      responseObject = response;
      return response.json();
    });

    checkResponse(responseObject, responseJson);

    yield put({
      type: actionEventTypes.RECEIVED_EVENT_DATA,
      payload: responseJson.data[0],
    });
  } catch (e) {
    console.error(e);
    yield put({ type: actionEventTypes.EVENT_ERROR, error: e });
  }
}

export function* notifyUsers(param){
  const {data, accessToken} =param;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };
  try{
    yield put({type:actionEventTypes.SET_EVENT_FETCHING});

    const postURL = APIService.dev+requestURLS.NOTIFY_SUBSCRIBER;
    let responseObject = {};
    let responseJSON = yield fetch(postURL,{
      headers: headers,
      method: "POST",
      body: JSON.stringify(data),
    }).then(response=> {
      responseObject = response;
      return response.json();
    });

    checkResponse(responseObject,responseJSON);

    yield put({type: actionEventTypes.SET_EVENT_FETCHING});

    message.success(responseJSON.message);
  } catch (e) {
    console.error(e);
    yield put({type: actionEventTypes.EVENT_ERROR, error: e});
    message.error(e.message);
  }
}

export function* subscribeFreeEvent(param){
  const {data, accessToken, callback } = param;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`
  }
  try{
    yield put({type: actionEventTypes.SET_EVENT_FETCHING});
    let postUrl  = APIService.dev+requestURLS.SUBSCRIPTION;
    let responseObject = {};
    let responseJson = yield fetch(postUrl,{
      headers: headers,
      method: "POST",
      body: JSON.stringify(data)
    }).then(response => {
      responseObject = response;
      return response.json();
    })

    checkResponse(responseObject,responseJson);

    let responseMessage = responseJson.message;

    let getURL = APIService.dev + requestURLS.EVENT_OPERATIONS + `${data.event_id}/`;
    responseJson = yield fetch(getURL, {
      headers: headers,
      method: "GET",
    }).then((response) => {
      responseObject = response;
      return response.json();
    });

    checkResponse(responseObject, responseJson);

    yield put({
      type: actionEventTypes.RECEIVED_EVENT_DATA,
      payload: responseJson.data,
    });

    callback();
    message.success(responseMessage);
  }catch (e) {
    console.error(e);
    yield put({type: actionEventTypes.EVENT_ERROR, error: e});
    callback(e.message);
  }
}

export function* paidSubscription(param){
  const {data, accessToken, callback} = param;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`
  }
  try{
    yield put({type: actionEventTypes.SET_EVENT_FETCHING});

    let postURL = APIService.dev+requestURLS.SUBSCRIPTION;
    let responseObject = {};
    let responseJson = yield fetch(postURL, {
      headers : headers,
      method: "POST",
      body: JSON.stringify(data)
    }).then(response => {
      responseObject = response;
      return response.json();
    });

    checkResponse(responseObject, responseJson);
    let responseMessage = responseJson.message;

    let getURL = APIService.dev + requestURLS.EVENT_OPERATIONS + `${data.event_id}/`;
    responseJson = yield fetch(getURL, {
      headers: headers,
      method: "GET",
    }).then((response) => {
      responseObject = response;
      return response.json();
    });

    checkResponse(responseObject, responseJson);

    yield put({
      type: actionEventTypes.RECEIVED_EVENT_DATA,
      payload: responseJson.data,
    });

    callback();
    message.success(responseMessage);

  } catch (e) {
    console.error(e);
    yield put({type: actionEventTypes.EVENT_ERROR, error: e});
    callback(e.message);
    message.error(e.message);
  }
}

export function* cancelSubscription(param) {
  const {eventId, accessToken} =param;
  const headers = {
    Authorization: `Bearer ${accessToken}`
  }
  try{
    yield put({type: actionEventTypes.SET_EVENT_FETCHING});

    let deleteURL = APIService.dev + requestURLS.SUBSCRIPTION+`${eventId}`;
    let responseObject = {};
    let responseJSON = yield fetch(deleteURL, {
      headers: headers,
      method: "DELETE",
    }).then(response => {
      responseObject = response;
      return response.json();
    })
    checkResponse(responseObject, responseJSON);
    let responseMessage = responseJSON.message;

    let getURL = APIService.dev + requestURLS.EVENT_OPERATIONS + `${eventId}/`;
    responseJSON = yield fetch(getURL, {
      headers: headers,
      method: "GET",
    }).then((response) => {
      responseObject = response;
      return response.json();
    });

    checkResponse(responseObject, responseJSON);

    yield put({
      type: actionEventTypes.RECEIVED_EVENT_DATA,
      payload: responseJSON.data,
    });
    message.success(responseMessage);
  } catch (e) {
    console.error(e);
    yield put({type: actionEventTypes.EVENT_ERROR, error: e});
    message.error(e.message);
  }
}

export function* shareWithFriendPost(param) {
  const {data, accessToken } = param;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`
  }
  try{
    yield put({type: actionEventTypes.SET_EVENT_FETCHING});

    let postURL = APIService.dev+requestURLS.SHARE_FRIEND;
    let responseObject = {};
    let responseJSON = yield fetch(postURL,{
      headers: headers,
      method: "POST",
      body: JSON.stringify(data)
    }).then(response => {
      responseObject = response;
      return response.json();
    })

    checkResponse(responseObject, responseJSON);

    yield put({type: actionEventTypes.SET_EVENT_FETCHING});
    message.success(responseJSON.message);

  } catch (e) {
    console.error(e);
    yield put({type: actionEventTypes.EVENT_ERROR, error: e});
    message.error(e.message);
  }
}

export function* updateWishlistUser(param){
  const {data, accessToken, updateType, callback} = param;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`
  }
  try{
    yield put({type: actionEventTypes.SET_EVENT_FETCHING});
    if(updateType === "add"){
      let postUrl = APIService.dev + requestURLS.WISHLIST;
      let responseObject = {};
      let responseJSON = yield fetch(postUrl,{
        headers: headers,
        method: "POST",
        body: JSON.stringify(data)
      }).then(response => {
        responseObject = response;
        return response.json();
      });

      checkResponse(responseObject, responseJSON);

      yield put({type: actionEventTypes.SET_EVENT_FETCHING});
      message.success(responseJSON.message);
    }
    else{
      let deleteUrl = APIService.dev + requestURLS.WISHLIST+`${data.event_id}/`;
      let responseObject = {};
      let responseJSON = yield fetch(deleteUrl, {
        headers: headers,
        method: "DELETE",
      }).then(response => {
        responseObject = response;
        return response.json();
      });

      checkResponse(responseObject, responseJSON);

      yield put({type: actionEventTypes.SET_EVENT_FETCHING});
      message.success(responseJSON.message);
    }
    callback();
  } catch (e) {
    console.error(e);
    yield put({type: actionEventTypes.EVENT_ERROR, error: e});
    message.error(e.message);
  }
}
export function* eventActionWatcher() {
  yield takeLatest(actionEventTypes.CREATE_EVENT, createNewEvent);
  yield takeLatest(actionEventTypes.GET_EVENT_LIST, fetchEventsList);
  yield takeLatest(actionEventTypes.GET_EVENT_DATA, fetchEventData);
  yield takeLatest(actionEventTypes.SAVE_INVITEE, saveInvitees);
  yield takeLatest(actionEventTypes.CANCEL_EVENT, deleteEvent);
  yield takeLatest(actionEventTypes.NOTIFY_SUBSCRIBER, notifyUsers);
  yield takeLatest(actionSubscription.SUBSCRIBE_FREE, subscribeFreeEvent);
  yield takeLatest(actionSubscription.SUBSCRIBE_PAID, paidSubscription);
  yield takeLatest(actionEventTypes.SHARE_WITH_FRIEND, shareWithFriendPost);
  yield takeLatest(actionSubscription.CANCEL_SUBSCRIPTION, cancelSubscription);
  yield takeLatest(actionEventTypes.WISHLIST_UPDATE, updateWishlistUser);
}

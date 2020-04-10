import { actionEventTypes } from "../constants/actionTypes";

export const createNewEvent = ({formData,callback,accessToken,}) => {
    return {
      type: actionEventTypes.CREATE_EVENT,
      data: formData,
      callback,
      accessToken,
    };
}
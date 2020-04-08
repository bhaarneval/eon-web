import { actionLoginTypes } from "../constants/actionTypes";

const initialData = {
  loginData: null
};

const userReducer = (state = initialData, action) => {
  switch (action.type) {
    case actionLoginTypes.GET_USER:
      return {
        ...state
      };
      case actionLoginTypes.USER_RECIEVED:
        console.log('herererere')
        return {
          ...state,
          loginData: action.payload
        };
    default:
      return state;
  }
};
export default userReducer;

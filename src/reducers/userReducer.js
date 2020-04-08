import { actionLoginTypes } from "../constants/actionTypes";

const initialData = {
  fetchingUser: false,
  accessToken: "",
  refreshToken: "",
  userData: {},
  userRole: "",
};

const userReducer = (state = initialData, action) => {
  switch (action.type) {
    case actionLoginTypes.SET_USER_FETCHING:
      return {
        ...state,
        fetchingUser: true,
      };
      case actionLoginTypes.USER_RECIEVED:
        return {
          ...state,
          accessToken: action.payload.access,
          refreshToken: action.payload.refresh,
          userData: action.payload.user,
          userRole: action.payload.user.role.role,
          fetchingUser: false,
        };
      case actionLoginTypes.USER_ERROR:
        return {
          ...state,
          fetchingUser:false,
          
        }
      case actionLoginTypes.LOG_OUT:
        return state;
    default:
      return state;
  }
};
export default userReducer;

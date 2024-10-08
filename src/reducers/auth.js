import axios from 'axios';
import { LOGIN_S, LOGIN_F, LOGOUT } from "../constants/types";

const initialState = {
  user: undefined,
  user_type: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_S:
      localStorage.setItem(
        "auth_token",
        action.payload.data.auth_token
      );
      localStorage.setItem(
        "user_type",
        action.payload.data.role
      );
      axios.defaults.headers.auth_token = action.payload.data.auth_token;
      return { ...state, user: action.payload.data };
    case LOGIN_F:
    case LOGOUT:
      localStorage.removeItem("user");
      return initialState;
    default:
      return state;
  }
};

export default authReducer;

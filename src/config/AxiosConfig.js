// /**
//  * Axios config  setup
//  * Set interceptor for global api response error handling
//  * Set access token in headers
//  */
import axios from "axios";
import store from "../store";
import { LOGOUT } from "../constants/types";

export const axiosInterceptor = () => {
  axios.defaults.headers.language = "en";
  axios.defaults.headers.web_app_version = "1.0.0";
  const token = JSON.parse(localStorage.getItem("auth_token"));
  if (token) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  } else {
    axios.defaults.headers.auth_token =
      "@#Slsjpoq$S1o08#MnbAiB%UVUV&Y*5EU@exS1o!08L9TSlsjpo#";
  }

  axios.interceptors.request.use(null, (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        store.dispatch({
          type: LOGOUT,
        });
        return Promise.reject(error);
      } else return Promise.reject(error);
    } else if (error.request) {
      let err = {
        response: {
          data: {
            message: "Something went wrong,Please try again later!!!",
          },
        },
      };
      return Promise.reject(err);
    }
  });

  axios.interceptors.response.use(null, (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        store.dispatch({
          type: LOGOUT,
        });
        return Promise.reject(error);
      } else return Promise.reject(error);
    } else if (error.request) {
      let err = {
        response: {
          data: {
            message: "Something went wrong,Please try again later!!!",
          },
        },
      };
      return Promise.reject(err);
    }
  });
};

import { API_CREATORS_LIST, API_CREATORS_LISTING, API_CREATORS_LIST_BASED_FILTER, API_CREATORS_VIEW, API_CREATOR_VERIFY, API_NOTIFICATION, API_StATE_DISTRICTS } from "../constants/api";
import {
  API,
  CREATORS_F,
  CREATORS_LIST_BASED_FILTER_F,
  CREATORS_LIST_BASED_FILTER_S,
  CREATORS_S,
  CREATORS_VERIFY_DOCS_F,
  CREATORS_VERIFY_DOCS_S,
  CREATORS_VIEW_F,
  CREATORS_VIEW_S,
  LIST_CREATORS_F,
  LIST_CREATORS_S,
  Notification_F,
  Notification_S,
  STATE_LIST_F,
  STATE_LIST_S,
} from "../constants/types";
import { data } from "../pages/Dashboard/AgeRange";

export const CreatorsListing = () => ({
  type: API,
  payload: {
    url: API_CREATORS_LISTING,
    method: "GET",
    success: (data) => ({
      type: CREATORS_S,
      payload: data,
    }),
    error: (data) => ({
      type: CREATORS_F,
      payload: data,
    }),
  },
});

export const fetchCreator = (data) => 
({
  type: API,
  payload: {
    url: API_CREATORS_VIEW + data,
    method: "GET",
    success: (data) => ({
      type: CREATORS_VIEW_S,
      payload: data,
    }),
    error: (data) => ({
      type: CREATORS_VIEW_F,
      payload: data,
    }),
  },
});

export const creatorsVerify = (data, id) => 
({
  type: API,
  payload: {
    url: API_CREATOR_VERIFY,
    method: "POST",
    data:data,
    success: (data) => ({
      type: CREATORS_VERIFY_DOCS_S,
      payload: data,
    }),
    error: (data) => ({
      type: CREATORS_VERIFY_DOCS_F,
      payload: data,
    }),
  },
});

export const CreatorsAllListing = (data) => ({
  type: API,
  payload: {
    url: API_CREATORS_LIST + data,
    method: "GET",
    success: (data) => ({
      type: LIST_CREATORS_S,
      payload: data,
    }),
    error: (data) => ({
      type: LIST_CREATORS_F,
      payload: data,
    }),
  },
});

export const CreatorsFiletrList = (data) => ({
  type: API,
  payload: {
    url: API_CREATORS_LIST_BASED_FILTER,
    method: "POST",
    data: data,
    success: (data) => ({
      type: CREATORS_LIST_BASED_FILTER_S,
      payload: data,
    }),
    error: (data) => ({
      type: CREATORS_LIST_BASED_FILTER_F,
      payload: data,
    }),
  },
});

// export const stateList = () => ({
//   type: API,
//   payload: {
//     url: API_StATE_DISTRICTS,
//     method: "GET",
//     success: (data) => ({
//       type: STATE_LIST_S,
//       payload: data,
//     }),
//     error: (data) => ({
//       type: STATE_LIST_F,
//       payload: data,
//     }),
//   },
// })

export const notification = (data) => ({
  type: API,
  payload: {
    url: API_NOTIFICATION,
    method: "POST",
    data: data,
    success: (data) => ({
      type: Notification_S,
      payload: data,
    }),
    error: (data) => ({
      type: Notification_F,
      payload: data,
    }),
  },
})
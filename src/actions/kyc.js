import { GET_KYC_LIST } from "../constants/api";
import { API, GET_LIST_KYC_F, GET_LIST_KYC_S } from "../constants/types";

export const KycListing = (data) => ({
  type: API,
  payload: {
    url: GET_KYC_LIST + data,
    method: "GET",
    success: (data) =>
    ({
      type: GET_LIST_KYC_S,
      payload: data,
    }),
    error: (data) => ({
      type: GET_LIST_KYC_F,
      payload: data,
    }),
  },
});

export const KycFilterListing = (filter) => ({
  type: API,
  payload: {
    url: GET_KYC_LIST+filter,
    method: "GET",
    success: (data) =>
    ({
      type: GET_LIST_KYC_S,
      payload: data,
    }),
    error: (data) => ({
      type: GET_LIST_KYC_F,
      payload: data,
    }),
  },
});
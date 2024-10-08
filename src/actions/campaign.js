import {
  API_CAMPAIGN_APPLICATION_LIST,
  API_CAMPAIGN_APPLICATION_STATUS,
  API_CAMPAIGN_CREATE,
  API_CAMPAIGN_DELETE,
  API_CAMPAIGN_EDIT,
  API_CAMPAIGN_LIST,
  API_CAMPAIGN_STEPPER,
  API_CAMPAIGN_VIEW,
  API_CATEGORIES_LISTING,
  API_LATLONG,
} from "../constants/api";
import {
  ADD_CAMPAIGN_F,
  ADD_CAMPAIGN_S,
  API,
  CAMPAIGN_APPLICATION_STATUS_F,
  CAMPAIGN_APPLICATION_STATUS_S,
  CAMPAIGN_F,
  CAMPAIGN_S,
  CAMPAIGN_STEPPER_APPLICATION_F,
  CAMPAIGN_STEPPER_APPLICATION_S,
  CATEGORY_F,
  CATEGORY_S,
  DELETE_CAMPAIGN_F,
  DELETE_CAMPAIGN_S,
  EDIT_CAMPAIGN_F,
  EDIT_CAMPAIGN_S,
  LATLONG_F,
  LATLONG_S,
  VIEW_CAMPAIGN_APPLICATION_F,
  VIEW_CAMPAIGN_APPLICATION_S,
  VIEW_CAMPAIGN_F,
  VIEW_CAMPAIGN_S,
} from "../constants/types";

export const CampaignListing = (data) => ({
  type: API,
  payload: {
    url: data ? API_CAMPAIGN_LIST + data : API_CAMPAIGN_LIST,
    method: "GET",
    success: (data) => ({
      type: CAMPAIGN_S,
      payload: data,
    }),
    error: (data) => ({
      type: CAMPAIGN_F,
      payload: data,
    }),
  },
});

export const fetchCampaign = (data) => ({
  type: API,
  payload: {
    url: API_CAMPAIGN_VIEW + data,
    method: "GET",
    success: (data) => ({
      type: VIEW_CAMPAIGN_S,
      payload: data,
    }),
    error: (data) => ({
      type: VIEW_CAMPAIGN_F,
      payload: data,
    }),
  },
});

export const deleteCampaign = (data) => ({
  type: API,
  payload: {
    url: API_CAMPAIGN_DELETE + data,
    method: "DELETE",
    success: (data) => ({
      type: DELETE_CAMPAIGN_S,
      payload: data,
    }),
    error: (data) => ({
      type: DELETE_CAMPAIGN_F,
      payload: data,
    }),
  },
});

export const AddCampaign = (data) => ({
  type: API,
  payload: {
    url: API_CAMPAIGN_CREATE,
    method: "POST",
    data: data,
    success: (data) => ({
      type: ADD_CAMPAIGN_S,
      payload: data,
    }),
    error: (data) => ({
      type: ADD_CAMPAIGN_F,
      payload: data,
    }),
  },
});

export const EditCampaignDetails = (data) => ({
  type: API,
  payload: {
    url: API_CAMPAIGN_EDIT,
    method: "PATCH",
    data: data,
    success: (data) => ({
      type: EDIT_CAMPAIGN_S,
      payload: data,
    }),
    error: (data) => ({
      type: EDIT_CAMPAIGN_F,
      payload: data,
    }),
  },
});

export const CategoriesListing = () => ({
  type: API,
  payload: {
    url: API_CATEGORIES_LISTING,
    method: "GET",
    success: (data) => ({
      type: CATEGORY_S,
      payload: data,
    }),
    error: (data) => ({
      type: CATEGORY_F,
      payload: data,
    }),
  },
});

export const CampaignApplicationListing = (data) => ({
  type: API,
  payload: {
    url: API_CAMPAIGN_APPLICATION_LIST + data,
    method: "GET",
    success: (data) => ({
      type: VIEW_CAMPAIGN_APPLICATION_S,
      payload: data,
    }),
    error: (data) => ({
      type: VIEW_CAMPAIGN_APPLICATION_F,
      payload: data,
    }),
  },
});

export const CampaignApplicationStepper = (data) => ({
  type: API,
  payload: {
    url: API_CAMPAIGN_STEPPER,
    method: "POST",
    data: data,
    success: (data) => ({
      type: CAMPAIGN_STEPPER_APPLICATION_S,
      payload: data,
    }),
    error: (data) => ({
      type: CAMPAIGN_STEPPER_APPLICATION_F,
      payload: data,
    }),
  },
});

export const applicationStatusFetch = (data) => ({
  type: API,
  payload: {
    url: API_CAMPAIGN_APPLICATION_STATUS + data,
    method: "GET",
    success: (data) => ({
      type: CAMPAIGN_APPLICATION_STATUS_S,
      payload: data,
    }),
    error: (data) => ({
      type: CAMPAIGN_APPLICATION_STATUS_F,
      payload: data,
    }),
  },
})

export const latLongCamp = (data) => ({
  type: API,
  payload: {
    url: API_LATLONG,
    method: "POST",
    data: data,
    success: (data) => ({
      type: LATLONG_S,
      payload: data,
    }),
    error: (data) => ({
      type: LATLONG_F,
      payload: data,
    }),
  },
});
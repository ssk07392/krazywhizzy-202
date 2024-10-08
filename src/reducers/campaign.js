import {
  CAMPAIGN_S,
  CAMPAIGN_F,
  VIEW_CAMPAIGN_S,
  VIEW_CAMPAIGN_F,
  CAMPAIGN_APPLICATION_STATUS_S,
  CAMPAIGN_APPLICATION_STATUS_F,
  LATLONG_S,
  LATLONG_F,
} from "../constants/types";

const initialState = {
  campaigns: [],
  viewCampaign: {},
  applicationStatus: []
};

const campaign = (state = initialState, action) => {
  switch (action.type) {
    case CAMPAIGN_S:
      return { ...state, campaigns: action.payload.data };
    case CAMPAIGN_F:
      return { ...state, campaigns: undefined };

    case VIEW_CAMPAIGN_S:
      return { ...state, viewCampaign: action.payload.data };

    case VIEW_CAMPAIGN_F:
      return { ...state, viewCampaign: undefined };
    case CAMPAIGN_APPLICATION_STATUS_S:
      return {...state, applicationStatus: action.payload.data}
    case CAMPAIGN_APPLICATION_STATUS_F:
      return {...state, applicationStatus: undefined}
    case LATLONG_S:
      return {...state, applicationStatus: action.payload.data}
    case LATLONG_F:
      return {...state, applicationStatus: undefined}
    default:
      return state;
  }
};

export default campaign;

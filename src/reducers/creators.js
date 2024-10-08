import {
    CREATORS_S,
    CREATORS_F,
    CREATORS_VIEW_F,
    CREATORS_VIEW_S,
    CREATORS_VERIFY_DOCS_S,
    CREATORS_VERIFY_DOCS_F,
    CREATORS_LIST_BASED_FILTER_S,
    CREATORS_LIST_BASED_FILTER_F,
    STATE_LIST_S,
    STATE_LIST_F,
    Notification_S,
    Notification_F,
  } from "../constants/types";
  
  const initialState = {
    creators: [],
    creator: {},
    verifyDocs: {},
    creatorsFilterList: [],
    state: [],
    notification: {}
  };
  
  const creators = (state = initialState, action) => {
    switch (action.type) {
      case CREATORS_S:
        return { ...state, creators: action.payload.data };
      case CREATORS_F:
        return { ...state, creators: action.payload.data };
      case CREATORS_VIEW_S:
          return { ...state, creator: action.payload.data };
      case CREATORS_VIEW_F:
          return { ...state, creator: action.payload.data };
      case CREATORS_VERIFY_DOCS_S:
        return { ...state, verifyDocs: action.payload.data };
      case CREATORS_VERIFY_DOCS_F:
        return { ...state, verifyDocs: action.payload.data };
      case CREATORS_LIST_BASED_FILTER_S:
        return { ...state, creatorsFilterList: action.payload.data };
      case CREATORS_LIST_BASED_FILTER_F:
        return { ...state, creatorsFilterList: action.payload.data };
      case STATE_LIST_S:
        return { ...state, state: action.payload.data };
      case STATE_LIST_F:
        return { ...state, state: action.payload.data };
      case Notification_S:
        return { ...state, notification: action.payload.data };
      case Notification_F:
        return { ...state, notification: action.payload.data };
      default:
        return state;
    }
  };
  
export default creators;
  
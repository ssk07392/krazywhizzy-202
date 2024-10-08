import {
    PAYMENTS_S,
    PAYMENTS_F,
    PAYMENTS_UPDATE_S,
    PAYMENTS_UPDATE_F,
    PAYMENTS_CREATOR_PAYOUT_S,
    PAYMENTS_CREATOR_PAYOUT_F,
    PAYMENTS_CREATE_BUCKET_S,
    PAYMENTS_CREATE_BUCKET_F,
    PAYMENTS_FETCH_TRANSACTION_S,
    PAYMENTS_FETCH_TRANSACTION_F,
    PAYMENTS_FETCH_TRANSACTION_DETAILS_S,
    PAYMENTS_FETCH_TRANSACTION_DETAILS_F,
    MATER_API_S,
    MATER_API_F,
  } from "../constants/types";
  
  const initialState = {
    paymentListing: [],
    creatorPayout: [],
    paymentBucket: [],
    paymentTransaction: [],
    paymentTransactionDetails: [],
    masterTransection: []
  };
  
  const Payment = (state = initialState, action) => {
    console.log("action type ----->",action.type)
    switch (action.type) {
      case PAYMENTS_S:
        return { ...state, paymentListing: action.payload.data };
      case PAYMENTS_F:
        return { ...state, paymentListing: undefined };
      case PAYMENTS_UPDATE_S:
        return { ...state, paymentListing: action.payload.data };
      case PAYMENTS_UPDATE_F:
        return { ...state, paymentListing: undefined };
      case PAYMENTS_CREATOR_PAYOUT_S:
        return { ...state, creatorPayout: action.payload.data };
      case PAYMENTS_CREATOR_PAYOUT_F:
        return { ...state, creatorPayout: undefined };
      case PAYMENTS_CREATE_BUCKET_S:
        return { ...state, paymentBucket: action.payload.data };
      case PAYMENTS_CREATE_BUCKET_F:
        return { ...state, paymentBucket: undefined };
      case PAYMENTS_FETCH_TRANSACTION_S:
        return { ...state, paymentTransaction: action.payload.data };
      case PAYMENTS_FETCH_TRANSACTION_F:
        return { ...state, paymentTransaction: undefined };
      case PAYMENTS_FETCH_TRANSACTION_DETAILS_S:
        return { ...state, paymentTransactionDetails: action.payload.data };
      case PAYMENTS_FETCH_TRANSACTION_DETAILS_F:
        return { ...state, paymentTransactionDetails: undefined };
      case MATER_API_S:
        return {...state, masterTransection: action.payload.data}
      case MATER_API_F:
        return {...state, masterTransection: action.payload.data}    
      default:
        return state;
    }
  };
  
  export default Payment;
  
export const {
    REACT_APP_API_BASE: API_BASE
} = process.env

export const API_LOGIN = `${API_BASE}login`
export const API_CATEGORIES_LISTING = `${API_BASE}categories`

// Creators
export const API_CREATORS_LISTING = `${API_BASE}dashboard`
export const API_CREATORS_VIEW = `${API_BASE}creators`
export const API_CREATORS_LIST = `${API_BASE}creators/all/`
export const API_CREATORS_LIST_BASED_FILTER = `${API_BASE}creators/fetchCreatorBasedOnFilter`

// Campaign API call url's
export const API_CAMPAIGN_LIST = `${API_BASE}campaigns/all/`
export const API_CAMPAIGN_VIEW = `${API_BASE}campaigns`
export const API_CAMPAIGN_CREATE = `${API_BASE}campaigns/create`
export const API_CAMPAIGN_EDIT = `${API_BASE}campaigns/edit-campaign`
export const API_CAMPAIGN_DELETE = `${API_BASE}campaigns/delete/`
export const API_CAMPAIGN_APPLICATION_LIST = `${API_BASE}campaigns/applicationListing`
export const API_CAMPAIGN_STEPPER = `${API_BASE}campaigns/updateApplicationStatus`
export const API_CAMPAIGN_APPLICATION_STATUS = `${API_BASE}campaigns/fetchApplicationStatus`

// Brand API call url's
export const API_BRANDS_LIST = `${API_BASE}brands/all/`
export const API_BRAND_CREATE = `${API_BASE}brands/create`
export const API_BRAND_EDIT = `${API_BASE}brands/edit-brand`
export const API_BRAND_VIEW = `${API_BASE}brands`
export const API_BRAND_DELETE = `${API_BASE}brands/delete/`

// KYC API Call url's
export const GET_KYC_LIST = `${API_BASE}kyc/`

// creators VerifyDocs 
export const API_CREATOR_VERIFY = `${API_BASE}creators/verifyDocs`

// payments 
export const API_PAYMENTS = `${API_BASE}payments/fetchCreatorPayoutList`;
export const API_PAYMENTS_pending_list = `${API_BASE}payments/fetchCampaignWithPendingList`
export const API_PAYMENTS_update = `${API_BASE}payments/updatePayoutStatus`;
export const API_PAYMENTS_creatorPayout = `${API_BASE}payments/fetchCreatorPayoutDetails`;
export const API_PAYMENTS_createBucket = `${API_BASE}payments/createBucketList`;
export const API_PAYMENTS_fetch_transaction = `${API_BASE}payments/fetchBucketTransactionList`;
export const API_PAYMENTS_fetch_transaction_details = `${API_BASE}payments/fetchBucketTransactionDetail`;

// upload excel file
export const UPLOAD_FILE = `${API_BASE}payments/uploadExcel`

// State && Districts

// export const API_StATE_DISTRICTS = `https://www.htmlspacecode.com/2021/08/indian-states-and-districts-in-json.html`

// Notification

export const API_NOTIFICATION = `${API_BASE}sendPushNotifications`

// LatLong Api

export const API_LATLONG = `${API_BASE}addHyperLocalCampaign`

// mastrTranction

export const API_MASTER = `${API_BASE}payments/fetchMasterTransactionList`
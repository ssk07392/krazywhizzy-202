import { API_BRANDS_LIST, API_BRAND_CREATE, API_BRAND_DELETE, API_BRAND_EDIT, API_BRAND_VIEW } from "../constants/api";
import { ADD_BRAND_F, ADD_BRAND_S, API, BRANDS_F, BRANDS_S, DELETE_BRAND_F, DELETE_BRAND_S, EDIT_BRAND_F, EDIT_BRAND_S, VIEW_BRAND_F, VIEW_BRAND_S} from "../constants/types";

export const BrandsListing = (data) => ({
  type: API,
  payload: {
    url: API_BRANDS_LIST + data,
    method: "GET",
    success: (data) =>
      ({
        type: BRANDS_S,
        payload: data,
      }),
    error: (data) => ({
      type: BRANDS_F,
      payload: data,
    }),
  },
});

export const fetchBrand = (data) => ({
  type: API,
  payload: {
      url: API_BRAND_VIEW+data,
      method: 'GET',
      success: (data) => ({
          type: VIEW_BRAND_S,
          payload: data
      }),
      error: (data) => ({
          type: VIEW_BRAND_F,
          payload: data
      })
  }
})


export const deleteBrand = (data) => ({
  type: API,
  payload: {
      url: API_BRAND_DELETE+data,
      method: 'DELETE',
      success: (data) => ({
          type: DELETE_BRAND_S,
          payload: data
      }),
      error: (data) => ({
          type: DELETE_BRAND_F,
          payload: data
      })
  }
})


export const AddBrand = (data) => ({
  type: API,
  payload: {
      url: API_BRAND_CREATE,
      method: 'POST',
      data: data,
      success: (data) => ({
          type: ADD_BRAND_S,
          payload: data
      }),
      error: (data) => ({
          type: ADD_BRAND_F,
          payload: data
      })
  }
})

export const EditBrandDetails = (data) => ({
  type: API,
  payload: {
      url: API_BRAND_EDIT,
      method: 'PATCH',
      data: data,
      success: (data) => ({
          type: EDIT_BRAND_S,
          payload: data
      }),
      error: (data) => ({
          type: EDIT_BRAND_F,
          payload: data
      })
  }
})

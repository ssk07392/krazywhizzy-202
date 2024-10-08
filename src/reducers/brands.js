import {
  BRANDS_S,
  BRANDS_F,
  VIEW_BRAND_F,
  VIEW_BRAND_S,
  DELETE_BRAND_F,
  DELETE_BRAND_S,
  EDIT_BRAND_F,
  EDIT_BRAND_S,
  ADD_BRAND_F,
  ADD_BRAND_S,
  CATEGORY_S,
  CATEGORY_F,
} from "../constants/types";

const initialState = {
  brands: [],
  viewBrand: [],
  viewCategories: [],
};

const brands = (state = initialState, action) => {
  switch (action.type) {
    case BRANDS_S:
      return { ...state, brands: action.payload.data };
    case BRANDS_F:
      return { ...state, brands: undefined };
    case VIEW_BRAND_S:
      return { ...state, viewBrand: action.payload.data };
    case VIEW_BRAND_F:
      return { ...state, viewBrand: undefined };
    case ADD_BRAND_S:
      return { ...state, viewBrand: action.payload.data };
    case ADD_BRAND_F:
      return { ...state, viewBrand: undefined };
    case EDIT_BRAND_S:
      return { ...state, viewBrand: action.payload.data };
    case EDIT_BRAND_F:
      return { ...state, viewBrand: undefined };
    case DELETE_BRAND_S:
      return { ...state, viewBrand: undefined, brands: undefined };
    case DELETE_BRAND_F:
      return { ...state };
    case CATEGORY_S: {
      return {...state, viewCategories: action.payload.data}
    }
    case CATEGORY_F: {
      return {...state, viewCategories: undefined}
    }
    default:
      return state;
  }
};

export default brands;

import { ActionTypes } from "../constants/actions-types";
const intialState = {
  products: [],
};
const toastData = {
  showAlert: false,
};

export const productsReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_PRODUCTS:
      return { ...state, products: payload };
    default:
      return state;
  }
};

export const selectedProductsReducer = (state = {}, { type, payload }) => {
  // console.log(type);
  switch (type) {
    case ActionTypes.SELECTED_PRODUCT:
      return { ...state, ...payload };
    case ActionTypes.REMOVE_SELECTED_PRODUCT:
      return {};
    default:
      return state;
  }
};

export const category = (state = [], { type, payload }) => {
  // console.log(type);
  switch (type) {
    case ActionTypes.CATEGORY:
      return { ...state, ...payload };
    default:
      return state;
  }
};

export const selectedCategoryReducer = (state = {}, { type, payload }) => {
  // console.log(type);
  switch (type) {
    case ActionTypes.SELECTED_CATEGORY:
      return { ...state, ...payload };
    case ActionTypes.REMOVE_SELECTED_CATEGORY:
      return {};
    default:
      return state;
  }
};


export const loggedinadminreducer = (state = {}, { type, payload }) => {
  // console.log(type);
  switch (type) {
    case ActionTypes.LOGGEDINADMIN:
      return { ...state, ...payload };
    default:
      return state;
  }
};
export const dashboardDataReducer = (state = {}, { type, payload }) => {
  // console.log(type);
  switch (type) {
    case ActionTypes.DASHBOARD_DATA:
      return { ...state, ...payload };
    default:
      return state;
  }
};

export const toastReducer = (state = toastData, { type, payload }) => {
  // console.log(type);
  switch (type) {
    case ActionTypes.TOAST:
      return { ...state, ...payload };
    default:
      return state;
  }
};
// dashboardData

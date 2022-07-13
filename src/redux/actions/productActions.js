import { ActionTypes } from "../constants/actions-types";

export const setProducts = (products) => {
  return {
    type: ActionTypes.SET_PRODUCTS,
    payload: products,
  };
};

export const selectedProduct = (product) => {
  return {
    type: ActionTypes.SELECTED_PRODUCT,
    payload: product,
  };
};
export const removeSelectedProduct = () => {
  return {
    type: ActionTypes.REMOVE_SELECTED_PRODUCT,
  };
};

export const categoryProduct = (category) => {
  return {
    type: ActionTypes.CATEGORY,
    payload:category,
  };
};

export const selectedCategory = (selectedCategory) => {
  return {
    type: ActionTypes.SELECTED_CATEGORY,
    payload: selectedCategory,
  };
};
export const removeSelectedCategory = () => {
  return {
    type: ActionTypes.REMOVE_SELECTED_CATEGORY,
  };
};

export const loggedInAdmin = (loggedInAdmin) => {
  return {
    type: ActionTypes.LOGGEDINADMIN,
    payload: loggedInAdmin,
  };
};

export const dashboardData = (dashboardData) => {
  return {
    type: ActionTypes.DASHBOARD_DATA,
    payload: dashboardData,
  };
};

export const toast = (toast) => {
  return {
    type: ActionTypes.TOAST,
    payload: toast,
  };
};

// export const loggedInAdmin = () => {
//   return {
//     type: ActionTypes.LOGGEDINADMIN,
//   };
// };
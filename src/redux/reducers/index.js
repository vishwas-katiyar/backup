import { combineReducers } from "redux";
// import { productsReducer } from "./productsReducer";
import { productsReducer } from "./productReducer";
import {
  selectedProductsReducer,
  category,
  selectedCategoryReducer,
  loggedinadminreducer,
  dashboardDataReducer,
  toastReducer,
} from "./productReducer";
const reducers = combineReducers({
  allProducts: productsReducer,
  product: selectedProductsReducer,
  category: category,
  selectedCategory: selectedCategoryReducer,
  logindetails: loggedinadminreducer,
  dashboardData: dashboardDataReducer,
  toast:toastReducer

});
export default reducers;

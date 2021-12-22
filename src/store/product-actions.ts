import { AppDispatch } from '.';
import productService from '../services/products';
import { productActions } from './product-slice';

export const getProducts = () => {
  return async (dispatch: AppDispatch) => {
    productService
      .get()
      .then((response) => {
        dispatch(
          productActions.setProducts({
            products: response.data,
            error: false,
          })
        );
      })
      .catch((error) => {
        dispatch(
          productActions.setProducts({
            products: [],
            error: true,
          })
        );
      });
  };
};

export const getProductsFavorites = () => {
  return async (dispatch: AppDispatch) => {
    productService
      .getFavorites()
      .then((response) => {
        dispatch(
          productActions.setProducts({
            products: response.data,
            error: false,
          })
        );
      })
      .catch((error) => {
        dispatch(
          productActions.setProducts({
            products: [],
            error: true,
          })
        );
      });
  };
};

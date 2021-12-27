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

export const setProductFavorite = (id: string, putAsFavorite: boolean) => {
  return async (dispatch: AppDispatch) => {
    const favorite = putAsFavorite ? 1 : 0;
    productService
      .updateProduct(id, {
        favorite: String(favorite),
      })
      .then((response) => {
        dispatch(
          productActions.setFavorite({
            id: response.data.id,
            favorite: putAsFavorite,
          })
        );
      })
      .catch((error) => {
        console.error('Error in set favorites');
      });
  };
};

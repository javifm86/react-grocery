import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../models/product.model';

interface SliceState {
  products: Product[];
  error: boolean;
  loading: boolean;
}

type setProductsPayload = Pick<SliceState, 'products' | 'error'>;

interface setFavorite {
  id: string;
  favorite: boolean;
}

const initialState: SliceState = { products: [], error: false, loading: true };

const productsSlice = createSlice({
  name: 'products',
  initialState: initialState,
  reducers: {
    setProducts(state, action: PayloadAction<setProductsPayload>) {
      state.products = action.payload.products;
      state.error = action.payload.error;
      state.loading = false;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    addedToBasket(state, action: PayloadAction<Product>) {
      const productAdded = action.payload;
      const product = state.products.find(
        (element) => element.id === productAdded.id
      );
      if (product != null) {
        product.inBasket = true;
      }
    },
    setFavorite(state, action: PayloadAction<setFavorite>) {
      const productAdded = action.payload;
      const product = state.products.find(
        (element) => element.id === productAdded.id
      );
      if (product != null) {
        product.favorite = productAdded.favorite ? '1' : '0';
      }
    },
  },
});

export const productActions = productsSlice.actions;

export default productsSlice;

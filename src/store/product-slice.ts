import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../models/product.model';

interface SliceState {
  products: Product[];
  error: boolean;
  loading: boolean;
}

type setProductsPayload = Pick<SliceState, 'products' | 'error'>;

const initialState: SliceState = { products: [], error: false, loading: true };

const productsSlice = createSlice({
  name: 'product',
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
  },
});

export const productActions = productsSlice.actions;

export default productsSlice;

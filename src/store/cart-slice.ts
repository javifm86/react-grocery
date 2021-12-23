import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../models/product.model';

interface SliceState {
  cart: Product[];
}

const initialState: SliceState = { cart: [] };

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      const item = { ...action.payload };
      const elemInCart = state.cart.find((elem) => elem.id === item.id);

      if (elemInCart == null) {
        item.numItems = 1;
        state.cart.push(item);
      }
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;

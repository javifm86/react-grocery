import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../models/product.model';

interface SliceState {
  products: Product[];
  cart: Product[];
  error: boolean;
  loading: boolean;
}

type setProductsPayload = Pick<SliceState, 'products' | 'error'>;

interface setFavorite {
  id: string;
  favorite: boolean;
}

const initialState: SliceState = {
  products: [],
  cart: [],
  error: false,
  loading: true,
};

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
    addToCart(state, action: PayloadAction<Product>) {
      const itemAdded = { ...action.payload };
      const elemInCart = state.cart.find((elem) => elem.id === itemAdded.id);

      if (elemInCart == null) {
        itemAdded.numItems = 1;
        state.cart.push(itemAdded);
      }

      const product = state.products.find(
        (element) => element.id === itemAdded.id
      );
      if (product != null) {
        product.inBasket = true;
      }
    },
    removeFromCart(state, action: PayloadAction<Product>) {
      const itemAdded = { ...action.payload };
      state.cart = state.cart.filter((elem) => elem.id !== itemAdded.id);

      const product = state.products.find(
        (element) => element.id === itemAdded.id
      );
      if (product != null) {
        product.inBasket = false;
      }
    },
    updateNumItems(
      state,
      action: PayloadAction<{ id: string; newValue: number | undefined }>
    ) {
      const elemInCart = state.cart.find(
        (elem) => elem.id === action.payload.id
      );

      if (elemInCart != null) {
        elemInCart.numItems = action.payload.newValue;
      }
    },
  },
});

export const productActions = productsSlice.actions;

export default productsSlice;

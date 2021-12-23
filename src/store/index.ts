import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './cart-slice';
import productsSlice from './product-slice';

const store = configureStore({
  reducer: {
    [productsSlice.name]: productsSlice.reducer,
    [cartSlice.name]: cartSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

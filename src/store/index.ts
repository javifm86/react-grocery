import { configureStore } from '@reduxjs/toolkit';
import productsSlice from './product-slice';

const store = configureStore({
  reducer: {
    [productsSlice.name]: productsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

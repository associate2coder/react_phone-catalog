import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { langSlice } from './langSlice';
import { productsSlice } from './productsSlice';
import { themeSlice } from './themeSlice';
import { cartSlice } from '../modules/CartPage/store/cartSlice';
import { favSlice } from '../modules/FavouritesPage/store/favSlice';

export const rootReducer = combineSlices(
  langSlice,
  productsSlice,
  cartSlice,
  favSlice,
  themeSlice,
);

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

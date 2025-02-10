/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getProducts } from '../shared/services/productService';
import { Product } from '../shared/types/Product';

export interface ProductState {
  items: Product[];
  loaded: boolean;
  error: string;
}

const initialState: ProductState = {
  items: [],
  loaded: false,
  error: '',
};

export const initProducts = createAsyncThunk<Product[]>(
  'products/fetch',
  getProducts,
);

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(initProducts.pending, state => {
      state.loaded = false;
      state.error = '';
    });
    builder.addCase(
      initProducts.fulfilled,
      (state, action: PayloadAction<Product[]>) => {
        state.loaded = true;
        state.items = action.payload;
      },
    );
    builder.addCase(initProducts.rejected, (state, action) => {
      state.loaded = true;
      state.error = action.error.message || 'Something went wrong!';
    });
  },
});

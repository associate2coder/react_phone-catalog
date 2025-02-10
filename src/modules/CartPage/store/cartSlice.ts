/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from '../types/CartItem';
import { localStorageKeys } from '../../../config/constants';

// fetch cart content from localStorage (if any)
const init = () => {
  const cartItems = localStorage.getItem(localStorageKeys.cart);

  return cartItems ? JSON.parse(cartItems) : [];
};

const initialState: CartItem[] = init();

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<string>) => {
      const product = state.find(item => item.itemId === action.payload);

      if (product) {
        product.quantity += 1;
      } else {
        state.push({ itemId: action.payload, quantity: 1 });
      }
    },
    setItem: (state, action: PayloadAction<CartItem>) => {
      const index = state.findIndex(
        item => item.itemId === action.payload.itemId,
      );

      if (action.payload.quantity === 0) {
        state.splice(index, 1);
      } else {
        state.splice(index, 1, action.payload);
      }
    },
    clearCart: state => {
      state.splice(0, state.length);
    },
  },
});

export const { addItem, setItem, clearCart } = cartSlice.actions;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { localStorageKeys } from '../../../config/constants';

// fetch favourites from localStorage (if any)
const init = () => {
  const favItems = localStorage.getItem(localStorageKeys.favourites);

  return favItems ? JSON.parse(favItems) : [];
};

const initialState: string[] = init();

export const favSlice = createSlice({
  name: 'fav',
  initialState,
  reducers: {
    toggle: (state, action: PayloadAction<string>) => {
      const index = state.indexOf(action.payload);

      if (index === -1) {
        state.push(action.payload);
      } else {
        state.splice(index, 1);
      }
    },
    set: (state, action: PayloadAction<string[]>) => {
      state.splice(0, state.length, ...action.payload);
    },
  },
});

export const { toggle, set } = favSlice.actions;

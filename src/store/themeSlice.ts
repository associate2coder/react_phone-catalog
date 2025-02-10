import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Theme } from '../shared/types/Theme';
import { localStorageKeys } from '../config/constants';

const defaultState: string = window.matchMedia('prefers-color-scheme: dark')
  .matches
  ? Theme.dark
  : Theme.light;

// fetch cart content from localStorage (if any)
// if none, preferred theme is fetched
const init = () => {
  const theme = localStorage.getItem(localStorageKeys.theme);

  return (theme ? JSON.parse(theme) : defaultState) || Theme.light;
};

const initialState: Theme = init();

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    set: (_, action: PayloadAction<Theme>) => action.payload,
  },
});

export const { set } = themeSlice.actions;

/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Language } from '../shared/types/Language';

const initialState: string = Language.en;

export const langSlice = createSlice({
  name: 'lang',
  initialState,
  reducers: {
    setLang: (state, action: PayloadAction<Language>) => {
      state = action.payload;
    },
  },
});

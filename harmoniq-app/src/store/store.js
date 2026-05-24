import { configureStore } from '@reduxjs/toolkit';
import homeReducer from './homeSlice';
import searchReducer from './searchSlice';

export const store = configureStore({
  reducer: {
    home: homeReducer,
    search: searchReducer,
  },
});

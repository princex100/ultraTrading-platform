import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './themeSlice';
import userReducer from './userSlice';
import stockReducer from './stocksclice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    user: userReducer,
    stock: stockReducer,
  },
});

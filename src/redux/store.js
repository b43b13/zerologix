import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './slice/loginSlice';
import postListReducer from './slice/postSlice';

export const store = configureStore({
  reducer: {
    login: loginReducer,
    postList: postListReducer,
  },
});

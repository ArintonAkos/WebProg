import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducers';
import updateActionMiddleware from './middlewares/requestStatusMiddleware';
import authMiddleware from './middlewares/authMiddleware';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: true }).concat(updateActionMiddleware, authMiddleware),
});

export default store;

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

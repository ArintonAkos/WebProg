import { applyMiddleware, configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducers';
import updateStateMiddleware from './requestStatusMiddleware';

const store = configureStore({
  reducer: rootReducer,
  middleware: [updateStateMiddleware],
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducers';
import updateActionMiddleware from './middlewares/requestStatusMiddleware';
import authMiddleware from './middlewares/authMiddleware';
import { persistStore } from 'redux-persist';
import { PersistedState } from 'redux-persist/es/types';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }).concat(updateActionMiddleware, authMiddleware) as any,
});

export default store;

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer> & PersistedState;
export type AppDispatch = typeof store.dispatch;

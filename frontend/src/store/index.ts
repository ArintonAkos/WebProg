import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducers';
import updateActionMiddleware from './middlewares/requestStatusMiddleware';
import { PersistedState } from 'redux-persist/es/types';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }).concat(updateActionMiddleware) as any,
});

export default store;

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer> & PersistedState;
export type AppDispatch = typeof store.dispatch;

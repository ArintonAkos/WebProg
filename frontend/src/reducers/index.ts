import { combineReducers } from 'redux';
import reservationReducer from './reservationReducer';
import restaurantReducer from './restaurantReducer';
import storage from 'redux-persist/lib/storage';
import authReducer from '../reducers/authReducer';
import { persistReducer } from 'redux-persist';

const authPersistConfig = {
  key: 'user',
  storage,
  whitelist: ['auth'],
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

const rootReducer = combineReducers({
  reservation: reservationReducer,
  restaurant: restaurantReducer,
  auth: persistedAuthReducer,
});

export default rootReducer;

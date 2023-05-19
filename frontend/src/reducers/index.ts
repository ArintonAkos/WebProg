import { combineReducers } from 'redux';
import reservationReducer from './reservationReducer';
import restaurantReducer from './restaurantReducer';
import authReducer from './authReducer';
import newsReducer from './newsReducer';

const rootReducer = combineReducers({
  reservation: reservationReducer,
  restaurant: restaurantReducer,
  auth: authReducer,
  news: newsReducer,
});

export default rootReducer;

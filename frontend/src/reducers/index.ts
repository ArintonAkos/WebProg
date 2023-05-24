import { combineReducers } from 'redux';
import reservationReducer from './reservationReducer';
import restaurantReducer from './restaurantReducer';
import authReducer from '../reducers/authReducer';

const rootReducer = combineReducers({
  reservation: reservationReducer,
  restaurant: restaurantReducer,
  auth: authReducer,
});

export default rootReducer;

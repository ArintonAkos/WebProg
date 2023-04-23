import { combineReducers } from 'redux';
import reservationReducer from './reservationReducer';
import restaurantReducer from './restaurantReducer';

const rootReducer = combineReducers({
  reservation: reservationReducer,
  restaurant: restaurantReducer,
});

export default rootReducer;

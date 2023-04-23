import { Middleware } from 'redux';
import { CustomRootState } from '../reducers/state';
import { CombinedState } from '@reduxjs/toolkit';
import { ReservationState } from '../reducers/reservationReducer';
import { RestaurantState } from '../reducers/restaurantReducer';

interface CombinedRootState
  extends CombinedState<{
    reservation: ReservationState & CustomRootState;
    restaurant: RestaurantState & CustomRootState;
  }> {}

const updateStateMiddleware: Middleware<{}, CombinedRootState> = (state) => (next) => (action) => {
  if (action.payload.type) {
    action.payload.requestStatus = {
      type: action.payload.type,
      description: action.payload.description,
      showToast: action.payload.showToast,
      title: action.payload.title,
    };
  }

  if (action.payload.type === 'error') {
    action.payload.error = action.payload.description;
  }

  return next({ ...action });
};

export default updateStateMiddleware;

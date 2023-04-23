import { createSlice } from '@reduxjs/toolkit';
import { fetchRestaurantReservations } from '../actions/reservationActions';
import { DefaultState, CustomRootState } from './state';

export interface ReservationState {
  restaurantId?: number;
  items: any;
}

const InitialState: ReservationState & CustomRootState = {
  ...DefaultState,
  restaurantId: undefined,
  items: [],
};

const reservationSlice = createSlice({
  name: 'reservation',
  initialState: InitialState,
  reducers: {
    submitReservation: (state, action) => {
      console.log(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurantReservations.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRestaurantReservations.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchRestaurantReservations.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { submitReservation } = reservationSlice.actions;

export default reservationSlice.reducer;

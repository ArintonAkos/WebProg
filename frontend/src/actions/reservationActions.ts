import { createAsyncThunk } from '@reduxjs/toolkit';
import { get } from '../services/httpRequest';

export const fetchRestaurantReservations = createAsyncThunk('reservations/fetchRestaurantReservations', async () => {
  return get('reservation/restaurant/');
});

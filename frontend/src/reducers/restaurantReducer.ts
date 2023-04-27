import { createSlice } from '@reduxjs/toolkit';
import { createRestaurant, fetchRestaurants } from '../actions/restaurantActions';
import { DefaultState, CustomRootState } from './state';
import { mapAsyncThunkToGlobalAction } from '../actions';

export interface RestaurantState {
  data: any;
}

const InitialState: RestaurantState & CustomRootState = {
  ...DefaultState,
  data: undefined,
};

const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState: InitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurants.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRestaurants.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchRestaurants.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });

    mapAsyncThunkToGlobalAction(builder, createRestaurant, {
      pending: (state, action) => {
        state.status = 'loading';
      },
      fulfilled: (state, action) => {
        state.status = 'succeeded';
        state.requestStatus = action.requestStatus;
      },
      rejected: (state, action) => {
        console.log(state, action);

        state.status = 'failed';
        state.requestStatus = action.requestStatus;
      },
    });
  },
});

export const {} = restaurantSlice.actions;

export default restaurantSlice.reducer;

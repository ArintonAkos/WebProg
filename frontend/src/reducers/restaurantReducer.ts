import { createSlice } from '@reduxjs/toolkit';
import { fetchRestaurants } from '../actions/restaurantActions';
import { DefaultState, CustomRootState } from './state';

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
  reducers: {
    addRestaurant: (state, action) => {
      console.log(action);
    },
    getRestaurants: (state, action) => {
      console.log(action);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurants.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRestaurants.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        addRestaurant(state);
      })
      .addCase(fetchRestaurants.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addRestaurant, getRestaurants } = restaurantSlice.actions;

export default restaurantSlice.reducer;

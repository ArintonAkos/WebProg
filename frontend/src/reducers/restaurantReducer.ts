import { createRestaurant, editRestaurant, fetchRestaurant, fetchRestaurants } from '../actions/restaurantActions';
import { DefaultState, CustomRootState } from '../store/state';
import { mapAsyncThunkToGlobalAction } from '../actions';
import { wrapSliceWithCommonFunctions } from '../hoc/reducerWrapper';
import { AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit';
import { putMultiPart } from '../services/httpRequest';

export interface RestaurantState {
  data: any;
}

const InitialState: RestaurantState & CustomRootState = {
  ...DefaultState,
  data: undefined,
};

const restaurantSlice = wrapSliceWithCommonFunctions({
  name: 'restaurant',
  initialState: InitialState,
  reducers: {
    submitRestaurant: (state, action) => {},
  },
  extraReducers: (builder) => {
    mapAsyncThunkToGlobalAction(builder, fetchRestaurants, {
      pending: (state, action) => {
        console.log('pending');
        state.status = 'loading';
        state.data = undefined;
      },
      fulfilled: (state, action) => {
        state.status = 'succeeded';
        state.data = [...action.payload.data];
        state.requestStatus = action.requestStatus;
      },
      rejected: (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      },
    });

    mapAsyncThunkToGlobalAction(builder, fetchRestaurant, {
      pending: (state, action) => {
        state.status = 'loading';
        state.data = undefined;
      },
      fulfilled: (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      },
      rejected: (state, action) => {
        state.status = 'failed';
      },
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
        state.status = 'failed';
        state.requestStatus = action.requestStatus;
      },
    });

    mapAsyncThunkToGlobalAction(builder, editRestaurant, {
      pending: (state, action) => {
        state.status = 'loading';
      },
      fulfilled: (state, action) => {
        state.status = 'succeeded';
        state.requestStatus = action.requestStatus;
      },
      rejected: (state, action) => {
        state.status = 'failed';
        state.requestStatus = action.requestStatus;
      },
    });
  },
});

export const { submitRestaurant, setShowToast } = restaurantSlice.actions;

export default restaurantSlice.reducer;

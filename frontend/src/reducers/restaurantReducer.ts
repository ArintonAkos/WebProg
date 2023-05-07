import {
  createRestaurant,
  editRestaurant,
  fetchRestaurant,
  fetchRestaurants,
  uploadImages,
} from '../actions/restaurantActions';
import { DefaultState, CustomRootState } from '../store/state';
import { mapAsyncThunkToGlobalAction } from '../actions';
import { wrapSliceWithCommonFunctions } from '../hoc/reducerWrapper';

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
  reducers: {},
  extraReducers: (builder) => {
    mapAsyncThunkToGlobalAction(builder, fetchRestaurants, {
      pending: (state) => {
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
      pending: (state) => {
        state.status = 'loading';
        state.data = undefined;
      },
      fulfilled: (state, action) => {
        state.status = 'succeeded';

        state.data = action.payload;
      },
      rejected: (state) => {
        state.status = 'failed';
      },
    });

    mapAsyncThunkToGlobalAction(builder, createRestaurant, {
      pending: (state) => {
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
      pending: (state) => {
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

    mapAsyncThunkToGlobalAction(builder, uploadImages, {
      pending: (state) => {
        state.status = 'loading';
      },
      fulfilled: (state, action) => {
        state.status = 'succeeded';
        console.log(action.payload);
        state.data.restaurant = action.payload.restaurant;
        state.requestStatus = action.requestStatus;
      },
      rejected: (state, action) => {
        state.status = 'failed';
        state.requestStatus = action.requestStatus;
      },
    });
  },
});

export const {} = restaurantSlice.actions;

export default restaurantSlice.reducer;

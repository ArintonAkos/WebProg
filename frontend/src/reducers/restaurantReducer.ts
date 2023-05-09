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
import Restaurant from '../models/restaurant';
import User from '../models/user';

export interface RestaurantPageData {
  details?: Restaurant;
  users: Array<User>;
}

const InitialRestaurantPageData: RestaurantPageData = {
  details: undefined,
  users: [],
};

export interface RestaurantState {
  restaurants: Array<Restaurant>;
  restaurant: RestaurantPageData;
  editRestaurant?: Restaurant;
}

type RestaurantStateWithRootState = RestaurantState & CustomRootState;

const InitialState: RestaurantStateWithRootState = {
  ...DefaultState,
  restaurants: [],
  restaurant: InitialRestaurantPageData,
};

const restaurantSlice = wrapSliceWithCommonFunctions({
  name: 'restaurant',
  initialState: InitialState,
  reducers: {
    clearEditedRestaurantData: (state) => {
      state.editRestaurant = undefined;
    },
    clearData: (state) => {
      state.restaurants = [];
      state.restaurant = InitialRestaurantPageData;
      state.editRestaurant = undefined;
      state.requestStatus = {};
    },
  },
  extraReducers: (builder) => {
    mapAsyncThunkToGlobalAction(builder, fetchRestaurants, {
      pending: (state) => {
        state.status = 'loading';
        state.restaurants = [];
      },
      fulfilled: (state, action) => {
        state.status = 'succeeded';
        state.restaurants = [...action.payload.data];
        state.requestStatus = action.requestStatus;
      },
      rejected: (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      },
    });

    mapAsyncThunkToGlobalAction<RestaurantStateWithRootState, RestaurantPageData, any>(builder, fetchRestaurant, {
      pending: (state) => {
        state.status = 'loading';
        state.restaurant = InitialRestaurantPageData;
      },
      fulfilled: (state, action) => {
        state.status = 'succeeded';
        state.restaurant = action.payload;
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
        state.restaurant.details = undefined;
      },
      fulfilled: (state, action) => {
        state.status = 'succeeded';
        state.requestStatus = action.requestStatus;
        state.editRestaurant = action.payload.restaurant;
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
        state.restaurant.details = action.payload.restaurant;
        state.requestStatus = action.requestStatus;
      },
      rejected: (state, action) => {
        state.status = 'failed';
        state.requestStatus = action.requestStatus;
      },
    });
  },
});

export const { clearEditedRestaurantData } = restaurantSlice.actions;

export default restaurantSlice.reducer;

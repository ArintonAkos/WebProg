import { createReservation } from '../actions/reservationActions';
import { DefaultState, CustomRootState } from '../store/state';
import { wrapSliceWithCommonFunctions } from '../hoc/reducerWrapper';
import { mapAsyncThunkToGlobalAction } from '../actions';

export interface ReservationState {
  data: any;
}

const InitialState: ReservationState & CustomRootState = {
  ...DefaultState,
  data: undefined,
};

const reservationSlice = wrapSliceWithCommonFunctions({
  name: 'reservation',
  initialState: InitialState,
  reducers: {
    clearData: (state) => {
      state.data = undefined;
    },
  },
  extraReducers: (builder) => {
    mapAsyncThunkToGlobalAction(builder, createReservation, {
      pending: (state) => {
        state.status = 'loading';
      },
      fulfilled: (state, action) => {
        state.status = 'succeeded';
        state.requestStatus = action.requestStatus;
        state.data = action.payload;
      },
      rejected: (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.requestStatus = action.requestStatus;
      },
    });
  },
});

export const { clearData } = reservationSlice.actions;

export default reservationSlice.reducer;

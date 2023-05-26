import {
  createReservation,
  CreateReservationData,
  deleteReservation,
  DeleteReservationData,
  fetchReservations,
  FetchReservationsData,
} from '../actions/reservationActions';
import { DefaultState, CustomRootState } from '../store/state';
import { wrapSliceWithCommonFunctions } from '../hoc/reducerWrapper';
import { mapAsyncThunkToGlobalAction } from '../actions';
import Reservation from '../models/reservation';

export interface ReservationState {
  reservations: Reservation[];
  data: any;
}

const InitialState: ReservationState & CustomRootState = {
  ...DefaultState,
  reservations: [],
  data: undefined,
};

type ReservationStateWithRootState = ReservationState & CustomRootState;

const reservationSlice = wrapSliceWithCommonFunctions({
  name: 'reservation',
  initialState: InitialState,
  reducers: {
    clearData: (state) => {
      state.reservations = [];
    },
  },
  extraReducers: (builder) => {
    mapAsyncThunkToGlobalAction<ReservationStateWithRootState, FetchReservationsData>(builder, fetchReservations, {
      pending: (state) => {
        state.status = 'loading';
        state.reservations = [];
      },
    });

    mapAsyncThunkToGlobalAction<ReservationStateWithRootState, CreateReservationData>(builder, createReservation, {
      pending: (state) => {
        state.status = 'loading';
      },
      fulfilled: (state, action) => {
        state.status = 'succeeded';
        state.requestStatus = action.requestStatus;
        state.reservations.push(action.reservation);
      },
      rejected: (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.requestStatus = action.requestStatus;
      },
    });

    mapAsyncThunkToGlobalAction<ReservationStateWithRootState, DeleteReservationData>(builder, deleteReservation, {
      pending: (state) => {
        state.status = 'loading';
      },
      fulfilled: (state, action) => {
        state.status = 'succeeded';
        state.requestStatus = action.requestStatus;
        state.reservations = state.reservations.filter((r) => r._id !== action.id);
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

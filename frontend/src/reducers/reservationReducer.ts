import {
  changeReservationStatus,
  ChangeReservationStatusData,
  createReservation,
  CreateReservationData,
  deleteReservation,
  DeleteReservationData,
  fetchReservations,
  FetchReservationsData,
  fetchReservedTables,
  FetchReservedTablesData,
  getManagedReservations,
  GetManagedReservationsData,
  updateReservation,
  UpdateReservationData,
} from '../actions/reservationActions';
import { CustomRootState, DefaultState } from '../store/state';
import { wrapSliceWithCommonFunctions } from '../hoc/reducerWrapper';
import { mapAsyncThunkToGlobalAction } from '../actions';
import Reservation from '../models/reservation';
import Table from '../models/table';

export interface ReservationState {
  reservations: Reservation[];
  reservedTables: Table[];
  data: any;
}

const InitialState: ReservationState & CustomRootState = {
  ...DefaultState,
  reservations: [],
  reservedTables: [],
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
      fulfilled: (state, action) => {
        state.status = 'succeeded';
        state.requestStatus = action.requestStatus;
        state.reservations = action.payload.reservations;
      },
      rejected: (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.requestStatus = action.requestStatus;
      },
    });

    mapAsyncThunkToGlobalAction<ReservationStateWithRootState, CreateReservationData>(builder, createReservation, {
      pending: (state) => {
        state.status = 'loading';
      },
      fulfilled: (state, action) => {
        state.status = 'succeeded';
        state.requestStatus = action.requestStatus;
        state.reservations.push(action.payload.reservation);
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
        state.reservations = state.reservations.filter((r) => r._id !== action.payload.id);
      },
      rejected: (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.requestStatus = action.requestStatus;
      },
    });

    mapAsyncThunkToGlobalAction<ReservationStateWithRootState, UpdateReservationData>(builder, updateReservation, {
      pending: (state) => {
        state.status = 'loading';
      },
      fulfilled: (state, action) => {
        state.status = 'succeeded';
        state.requestStatus = action.requestStatus;
        state.reservations = state.reservations.map((r) =>
          r._id === action.payload.reservation._id ? action.payload.reservation : r,
        );
      },
      rejected: (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.requestStatus = action.requestStatus;
      },
    });

    mapAsyncThunkToGlobalAction<ReservationStateWithRootState, GetManagedReservationsData>(
      builder,
      getManagedReservations,
      {
        pending: (state) => {
          state.status = 'loading';
          state.reservations = [];
        },
        fulfilled: (state, action) => {
          state.status = 'succeeded';
          state.requestStatus = action.requestStatus;
          state.reservations = action.payload.reservations;
        },
        rejected: (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
          state.requestStatus = action.requestStatus;
        },
      },
    );

    mapAsyncThunkToGlobalAction<ReservationStateWithRootState, ChangeReservationStatusData>(
      builder,
      changeReservationStatus,
      {
        pending: (state) => {
          state.status = 'loading';
        },
        fulfilled: (state, action) => {
          const { _id, status } = action.payload.reservation;

          state.status = 'succeeded';
          state.reservations = state.reservations.map((r) => {
            return r._id === _id ? { ...r, status } : r;
          });
        },
        rejected: (state) => {
          state.status = 'loading';
        },
      },
    );

    mapAsyncThunkToGlobalAction<ReservationStateWithRootState, FetchReservedTablesData>(builder, fetchReservedTables, {
      pending: (state) => {
        state.status = 'loading';
        state.reservedTables = [];
      },
      fulfilled: (state, action) => {
        state.status = 'succeeded';
        state.requestStatus = action.requestStatus;
        state.reservedTables = action.payload.reservedTables;
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

import { AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit';
import { CreateReservationProps } from '../form-data/reservation/ReservationFormData';
import Reservation from '../models/reservation';
import createAuthClient from '../services/createAuthClient';
import BaseResponse from '../types/BaseResponse';
import Table from '../models/table';

type CreateReservationArgs = {
  id: string;
  data: CreateReservationProps;
};

type DeleteReservationArgs = {
  id: string;
};

export type FetchReservationsData = {
  reservations: Reservation[];
} & BaseResponse;

export type CreateReservationData = {
  reservation: Reservation;
} & BaseResponse;

export type DeleteReservationData = {
  id: string;
} & BaseResponse;

type UpdateReservationArgs = {
  id: string;
  data: CreateReservationProps;
};

export type UpdateReservationData = {
  reservation: Reservation;
} & BaseResponse;

export type GetManagedReservationsData = {
  reservations: Reservation[];
} & BaseResponse;

export type ChangeReservationStatusData = {
  reservation: {
    status: 'pending' | 'accepted' | 'rejected';
    _id: string;
  };
};

export type ChangeReservationStatusArgs = {
  id: string;
  data: {
    status: 'accepted' | 'rejected';
  };
};

export type FetchReservedTablesArgs = {
  restaurantId: string;
  date: string;
  time: string;
};

export type FetchReservedTablesData = {
  reservedTables: Table[];
} & BaseResponse;

export const fetchReservations: AsyncThunk<FetchReservationsData, void, {}> = createAsyncThunk<any, void>(
  'reservations/getReservations',
  async (_, thunkAPI) => {
    const { get } = createAuthClient(thunkAPI);

    return (await get('reservation/')) as FetchReservationsData;
  },
);

export const createReservation: AsyncThunk<CreateReservationData, CreateReservationArgs, {}> = createAsyncThunk<
  CreateReservationData,
  CreateReservationArgs
>('reservation/createReservation', async ({ id, data }, thunkAPI) => {
  const { post } = createAuthClient(thunkAPI);

  return (await post(`reservation/${id}`, data)) as CreateReservationData;
});

export const deleteReservation: AsyncThunk<DeleteReservationData, DeleteReservationArgs, {}> = createAsyncThunk<
  DeleteReservationData,
  DeleteReservationArgs
>('reservation/delete', async ({ id }, thunkAPI) => {
  const { deleteRequest } = createAuthClient(thunkAPI);

  return (await deleteRequest(`reservation/${id}`)) as DeleteReservationData;
});

export const updateReservation: AsyncThunk<UpdateReservationData, UpdateReservationArgs, {}> = createAsyncThunk<
  UpdateReservationData,
  UpdateReservationArgs
>('reservation/update', async ({ id, data }, thunkAPI) => {
  const { put } = createAuthClient(thunkAPI);

  return (await put(`reservation/${id}`, data)) as UpdateReservationData;
});

export const getManagedReservations: AsyncThunk<GetManagedReservationsData, void, {}> = createAsyncThunk<any, void>(
  'reservation/getManagedReservations',
  async (_, thunkAPI) => {
    const { get } = createAuthClient(thunkAPI);

    return (await get(`reservation/managed`)) as GetManagedReservationsData;
  },
);

export const changeReservationStatus: AsyncThunk<ChangeReservationStatusData, ChangeReservationStatusArgs, {}> =
  createAsyncThunk<ChangeReservationStatusData, ChangeReservationStatusArgs>(
    'reservation/changeReservationStatus',
    async ({ id, data }, thunkAPI) => {
      const { put } = createAuthClient(thunkAPI);

      const response = await put(`reservation/${id}`, data);

      return response as ChangeReservationStatusData;
    },
  );

export const fetchReservedTables: AsyncThunk<FetchReservedTablesData, FetchReservedTablesArgs, {}> = createAsyncThunk<
  FetchReservedTablesData,
  FetchReservedTablesArgs
>('reservation/fetchReservedTables', async ({ restaurantId, date, time }, thunkAPI) => {
  const { get } = createAuthClient(thunkAPI);

  return (await get(
    `reservation/reserved-tables/${restaurantId}?date=${date}&time=${time}`,
  )) as FetchReservedTablesData;
});

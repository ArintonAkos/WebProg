import { AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit';
import { CreateReservationProps } from '../components/pages/reservation/ReservationForm.data';
import Reservation from '../models/reservation';
import createAuthClient from '../services/createAuthClient';

type CreateReservationArgs = {
  id: string;
  data: CreateReservationProps;
};

type DeleteReservationArgs = {
  id: string;
};

export type FetchReservationsData = {
  reservations: Reservation[];
};

export type CreateReservationData = {
  reservation: Reservation;
};

export type DeleteReservationData = {
  id: string;
};

type UpdateReservationArgs = {
  id: string;
  data: CreateReservationProps;
};

export type UpdateReservationData = {
  reservation: Reservation;
};

type GetManagedReservationsArgs = {
  userId: string;
};

export type GetManagedReservationsData = {
  reservations: Reservation[];
};

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

  return (await deleteRequest(`/api/reservations/${id}`)) as DeleteReservationData;
});

export const updateReservation: AsyncThunk<UpdateReservationData, UpdateReservationArgs, {}> = createAsyncThunk<
  UpdateReservationData,
  UpdateReservationArgs
>('reservation/update', async ({ id, data }, thunkAPI) => {
  const { put } = createAuthClient(thunkAPI);

  return (await put(`reservation/${id}`, data)) as UpdateReservationData;
});

export const getManagedReservations: AsyncThunk<GetManagedReservationsData, any, {}> = createAsyncThunk<
  any,
  GetManagedReservationsArgs
>('reservation/getManagedReservations', async (_, thunkAPI) => {
  const { get } = createAuthClient(thunkAPI);

  return (await get(`reservation/managed`)) as GetManagedReservationsData;
});

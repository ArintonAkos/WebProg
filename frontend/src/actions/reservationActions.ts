import { AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit';
import { post, deleteRequest, get } from '../services/httpRequest';
import { CreateReservationProps } from '../components/pages/reservation/ReservationForm.data';
import Reservation from '../models/reservation';

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

export const fetchReservations: AsyncThunk<FetchReservationsData, void, {}> = createAsyncThunk<any, void>(
  'reservations/getReservations',
  async () => {
    return (await get('reservation/')) as FetchReservationsData;
  },
);

export const createReservation: AsyncThunk<CreateReservationData, CreateReservationArgs, {}> = createAsyncThunk<
  CreateReservationData,
  CreateReservationArgs
>('reservation/createReservation', async ({ id, data }) => {
  return (await post(`reservation/${id}`, data)) as CreateReservationData;
});

export const deleteReservation: AsyncThunk<DeleteReservationData, DeleteReservationArgs, {}> = createAsyncThunk<
  DeleteReservationData,
  DeleteReservationArgs
>('reservation/delete', async ({ id }) => {
  return (await deleteRequest(`/api/reservations/${id}`)) as DeleteReservationData;
});

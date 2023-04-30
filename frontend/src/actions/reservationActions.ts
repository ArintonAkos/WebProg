import { AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit';
import { post } from '../services/httpRequest';
import { CreateReservationProps } from '../components/pages/reservation/ReservationForm';

type CreateReservationArgs = {
  id: string;
  data: CreateReservationProps;
};

export const createReservation: AsyncThunk<any, CreateReservationArgs, {}> = createAsyncThunk<
  any,
  CreateReservationArgs
>('reservation/createReservation', async ({ id, data }) => {
  return await post(`reservation/${id}`, data);
});

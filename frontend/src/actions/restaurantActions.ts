import { AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit';
import { get, post } from '../services/httpRequest';

export const fetchRestaurants = createAsyncThunk<any, void>('restaurant/fetchRestaurants', async () => {
  return await get('restaurant/');
});

export const fetchRestaurant = createAsyncThunk<any, any>('restaurant/fetchRestaurant', async (id: any) => {
  return await get('restaurant/' + id);
});

export const createRestaurant: AsyncThunk<any, any, {}> = createAsyncThunk<any, any>(
  'restaurant/createRestaurant',
  async (restaurant: any) => {
    return await post('restaurant/', restaurant);
  },
);

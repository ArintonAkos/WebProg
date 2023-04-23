import { AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit';
import { get, post } from '../services/httpRequest';

// @ts-ignore
export const fetchRestaurants = createAsyncThunk<any, any>('restaurants/fetchRestaurants', async () => {
  return await get('restaurant/');
});

export const createRestaurant: AsyncThunk<any, any, {}> = createAsyncThunk<any, any>(
  'restaurants/createRestaurant',
  async (restaurant: any) => {
    console.log(restaurant);

    const response = await post('restaurant/', restaurant);

    console.log('AAAAAAAAAA:', response);

    return response;
  },
);

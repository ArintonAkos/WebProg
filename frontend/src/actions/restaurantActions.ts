import { AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit';
import Restaurant from '../models/restaurant';
import User from '../models/user';
import { RestaurantPageData } from '../reducers/restaurantReducer';
import createAuthClient from '../services/createAuthClient';
import { RestaurantCreateFormData } from '../form-data/restaurant/RestaurantCreateFormData';
import { objectToFormData } from '../services/objectService';
import FormDataService from '../services/formDataService';

interface EditRestaurantProps extends RestaurantCreateFormData {
  deletedImages: string[];
}

interface EditRestaurantArgs {
  id: string;
  restaurant: EditRestaurantProps;
}

interface UploadImagesFormData {
  images: File[];
}

interface UploadImagesArgs {
  id: string;
  restaurant: UploadImagesFormData;
}

export const fetchRestaurants = createAsyncThunk<any, void>('restaurant/fetchRestaurants', async (_, thunkAPI) => {
  const { get } = createAuthClient(thunkAPI);

  return await get('restaurant/');
});

export const fetchRestaurant = createAsyncThunk<RestaurantPageData, any>(
  'restaurant/fetchRestaurant',
  async (id: any, thunkAPI) => {
    const { get } = createAuthClient(thunkAPI);

    const restaurant: Restaurant = await get(`restaurant/${id}`);
    const users: User[] = await get('user/list');

    return {
      details: { ...restaurant },
      users: [...users],
    };
  },
);

export const createRestaurant: AsyncThunk<any, any, {}> = createAsyncThunk<any, any>(
  'restaurant/createRestaurant',
  async (restaurant: any, thunkAPI) => {
    const { post } = createAuthClient(thunkAPI);

    return await post('restaurant/', restaurant);
  },
);

export const editRestaurant: AsyncThunk<any, EditRestaurantArgs, {}> = createAsyncThunk<any, EditRestaurantArgs>(
  'restaurant/editRestaurant',
  async ({ id, restaurant }, thunkAPI) => {
    const { putMultiPart } = createAuthClient(thunkAPI);

    const formData = objectToFormData(restaurant);

    FormDataService.logFormData(formData);
    return await putMultiPart(`restaurant/${id}`, formData);
  },
);

export const uploadImages: AsyncThunk<any, any, {}> = createAsyncThunk<any, any>(
  'restaurant/uploadImages',
  async ({ id, restaurant }: UploadImagesArgs, thunkAPI) => {
    const { postMultiPart } = createAuthClient(thunkAPI);

    const formData = objectToFormData(restaurant);

    return await postMultiPart(`restaurant/${id}/images`, formData);
  },
);

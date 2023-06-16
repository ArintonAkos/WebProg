import { AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit';
import Restaurant from '../models/restaurant';
import User from '../models/user';
import { RestaurantPageData } from '../reducers/restaurantReducer';
import createAuthClient from '../services/createAuthClient';
import { RestaurantCreateFormData } from '../form-data/restaurant/RestaurantCreateFormData';

interface EditRestaurantArgs {
  id: string;
  restaurant: RestaurantCreateFormData;
}

interface UploadImagesFormData {
  images: File[];
}

interface UploadImagesArgs {
  id: string;
  restaurant: UploadImagesFormData;
}

const restaurantToFormData = (restaurant: RestaurantCreateFormData | UploadImagesFormData) => {
  const formData = new FormData();

  for (const key in restaurant) {
    const objKey: keyof (RestaurantCreateFormData | UploadImagesFormData) = key as keyof (
      | RestaurantCreateFormData
      | UploadImagesFormData
    );

    const value: any = restaurant[objKey];

    if (key === 'images' && restaurant.images) {
      restaurant.images.forEach((image) => {
        formData.append('images', image);
      });
    } else if (Array.isArray(value)) {
      formData.append(key, JSON.stringify(value));
    } else {
      formData.append(key, value?.toString());
    }
  }

  return formData;
};

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

export const editRestaurant: AsyncThunk<any, any, {}> = createAsyncThunk<any, any>(
  'restaurant/editRestaurant',
  async ({ id, restaurant }: EditRestaurantArgs, thunkAPI) => {
    const { putMultiPart } = createAuthClient(thunkAPI);

    const formData = restaurantToFormData(restaurant);

    return await putMultiPart(`restaurant/${id}`, formData);
  },
);

export const uploadImages: AsyncThunk<any, any, {}> = createAsyncThunk<any, any>(
  'restaurant/uploadImages',
  async ({ id, restaurant }: UploadImagesArgs, thunkAPI) => {
    const { postMultiPart } = createAuthClient(thunkAPI);

    const formData = restaurantToFormData(restaurant);

    return await postMultiPart(`restaurant/${id}/images`, formData);
  },
);

import { AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit';
import { get, post, postMultiPart, putMultiPart } from '../services/httpRequest';
import { AddRestaurantFormData } from '../pages/restaurant/AddRestaurantForm';
import Restaurant from '../models/restaurant';
import User from '../models/user';
import { RestaurantPageData } from '../reducers/restaurantReducer';

interface EditRestaurantArgs {
  id: string;
  restaurant: AddRestaurantFormData;
}

interface UploadImagesFormData {
  images: File[];
}

interface UploadImagesArgs {
  id: string;
  restaurant: UploadImagesFormData;
}

const restaurantToFormData = (restaurant: AddRestaurantFormData | UploadImagesFormData) => {
  const formData = new FormData();

  for (const key in restaurant) {
    if (key === 'images' && restaurant.images) {
      restaurant.images.forEach((image) => {
        formData.append('images', image);
      });
    } else {
      const objKey: keyof (AddRestaurantFormData | UploadImagesFormData) = key as keyof (
        | AddRestaurantFormData
        | UploadImagesFormData
      );

      formData.append(key, restaurant[objKey]!.toString());
    }
  }

  return formData;
};

export const fetchRestaurants = createAsyncThunk<any, void>('restaurant/fetchRestaurants', async () => {
  console.log('gettings called');

  return await get('restaurant/');
});

export const fetchRestaurant = createAsyncThunk<RestaurantPageData, any>(
  'restaurant/fetchRestaurant',
  async (id: any) => {
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
  async (restaurant: any) => {
    return await post('restaurant/', restaurant);
  },
);

export const editRestaurant: AsyncThunk<any, any, {}> = createAsyncThunk<any, any>(
  'restaurant/editRestaurant',
  async ({ id, restaurant }: EditRestaurantArgs) => {
    const formData = restaurantToFormData(restaurant);
    return await putMultiPart(`restaurant/${id}`, formData);
  },
);

export const uploadImages: AsyncThunk<any, any, {}> = createAsyncThunk<any, any>(
  'restaurant/uploadImages',
  async ({ id, restaurant }: UploadImagesArgs) => {
    const formData = restaurantToFormData(restaurant);

    return await postMultiPart(`restaurant/${id}/images`, formData);
  },
);

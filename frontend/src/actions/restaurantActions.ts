import { AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit';
import { get, post, putMultiPart } from '../services/httpRequest';
import { AddRestaurantFormData } from '../pages/restaurant/AddRestaurantForm';

interface EditRestaurantArgs {
  id: string;
  restaurant: AddRestaurantFormData;
}

const restaurantToFormData = (restaurant: AddRestaurantFormData) => {
  const formData = new FormData();
  console.log(restaurant);

  for (const key in restaurant) {
    console.log(key);
    if (key === 'images' && restaurant.images) {
      restaurant.images.forEach((image) => {
        formData.append('images', image);
      });
    } else {
      const objKey: keyof AddRestaurantFormData = key as keyof AddRestaurantFormData;

      formData.append(key, restaurant[objKey]!.toString());
    }
  }

  // @ts-ignore
  for (var pair of formData.entries()) {
    console.log(pair[0] + ', ' + pair[1]);
  }
  return formData;
};

export const fetchRestaurants = createAsyncThunk<any, void>('restaurant/fetchRestaurants', async () => {
  return await get('restaurant/');
});

export const fetchRestaurant = createAsyncThunk<any, any>('restaurant/fetchRestaurant', async (id: any) => {
  return await get(`restaurant/${id}`);
});

export const createRestaurant: AsyncThunk<any, any, {}> = createAsyncThunk<any, any>(
  'restaurant/createRestaurant',
  async (restaurant: any) => {
    return await post('restaurant/', restaurant);
  },
);

export const editRestaurant: AsyncThunk<any, EditRestaurantArgs, {}> = createAsyncThunk<any, any>(
  'restaurant/editRestaurant',
  async ({ id, restaurant }) => {
    console.log(restaurant);

    const formData = restaurantToFormData(restaurant);

    console.log(formData);
    return await putMultiPart(`restaurant/${id}`, formData);
  },
);

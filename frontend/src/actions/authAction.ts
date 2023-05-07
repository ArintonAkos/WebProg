import { AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit';
import { post } from '../services/httpRequest';

type CreateUserArgs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const registerUser: AsyncThunk<any, CreateUserArgs, {}> = createAsyncThunk<any, CreateUserArgs>(
  'auth/registerUser',
  async ({ name, email, password, confirmPassword }) => {
    return await post(`auth/register`, { name, email, password, confirmPassword });
  },
);

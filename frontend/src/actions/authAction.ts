import { AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit';
import createAuthClient from '../services/createAuthClient';

type CreateUserArgs = {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

export const registerUser: AsyncThunk<any, CreateUserArgs, {}> = createAsyncThunk<any, CreateUserArgs>(
  'auth/registerUser',
  async (createUserArgs, thunkAPI) => {
    const { post } = createAuthClient(thunkAPI);

    return await post(`auth/register`, createUserArgs);
  },
);

type LoginUserArgs = {
  email: string;
  password: string;
};

export const loginUser: AsyncThunk<any, LoginUserArgs, {}> = createAsyncThunk<any, LoginUserArgs>(
  'auth/loginUser',
  async ({ email, password }, thunkAPI) => {
    const { post } = createAuthClient(thunkAPI);

    return await post(`auth/login`, { email, password });
  },
);

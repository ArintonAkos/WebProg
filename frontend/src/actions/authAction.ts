import { AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit';
import createAuthClient from '../services/createAuthClient';
import { AvailableRoles } from '../models/role';

type CreateUserArgs = {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  role: 'Admin' | 'Moderator' | 'User';
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

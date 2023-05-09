import { CustomRootState, DefaultState } from '../store/state';
import { wrapSliceWithCommonFunctions } from '../hoc/reducerWrapper';
import { mapAsyncThunkToGlobalAction } from '../actions';
import { loginUser, registerUser } from '../actions/authAction';
import User from '../models/user';

export interface AuthState {
  user: {
    token?: string;
    refreshToken?: string;
    user?: User;
  };
  data: any;
}

const InitialState: AuthState & CustomRootState = {
  ...DefaultState,
  data: undefined,
  user: {
    token: undefined,
    refreshToken: undefined,
    user: undefined,
  },
};

const authSlice = wrapSliceWithCommonFunctions({
  name: 'auth',
  initialState: InitialState,
  reducers: {
    setIdleState: (state) => {
      state.status = 'idle';
      state.requestStatus = undefined;
    },
    updateTokens: (state, action: { payload: { token: string; refreshToken: string } }) => {
      state.user.token = action.payload.token;
      state.user.refreshToken = action.payload.refreshToken;
    },
  },
  extraReducers: (builder) => {
    mapAsyncThunkToGlobalAction(builder, registerUser, {
      pending: (state) => {
        state.status = 'loading';
      },
      fulfilled: (state, action) => {
        state.status = 'succeeded';
        state.requestStatus = action.requestStatus;
      },
      rejected: (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.requestStatus = action.requestStatus;
      },
    });

    mapAsyncThunkToGlobalAction(builder, loginUser, {
      pending: (state) => {
        state.status = 'loading';
      },
      fulfilled: (state, action) => {
        state.status = 'succeeded';
        state.requestStatus = action.requestStatus;
      },
      rejected: (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.requestStatus = action.requestStatus;
      },
    });
  },
});

export const { setIdleState, updateTokens } = authSlice.actions;

export default authSlice.reducer;

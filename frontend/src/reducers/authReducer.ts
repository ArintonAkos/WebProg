import { CustomRootState, DefaultState } from '../store/state';
import { wrapSliceWithCommonFunctions } from '../hoc/reducerWrapper';
import { mapAsyncThunkToGlobalAction } from '../actions';
import { loginUser, registerUser } from '../actions/authAction';
import User from '../models/user';

export interface UserData {
  token?: string;
  refreshToken?: string;
  user?: User;
}

export interface AuthState {
  userData: UserData;
  data: any;
}

const InitialState: AuthState & CustomRootState = {
  ...DefaultState,
  data: undefined,
  userData: {
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
      state.userData.token = action.payload.token;
      state.userData.refreshToken = action.payload.refreshToken;
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

        console.log(action);
        if (action.payload) {
          state.userData.token = action.payload.token;
          state.userData.refreshToken = action.payload.refreshToken;
          state.userData.user = action.payload.user;
        }
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

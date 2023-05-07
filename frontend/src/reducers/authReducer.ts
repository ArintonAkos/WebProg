import { CustomRootState, DefaultState } from '../store/state';
import { wrapSliceWithCommonFunctions } from '../hoc/reducerWrapper';
import { mapAsyncThunkToGlobalAction } from '../actions';
import { registerUser } from '../actions/authAction';

export interface AuthState {
  data: any;
}

const InitialState: AuthState & CustomRootState = {
  ...DefaultState,
  data: undefined,
};

const authSlice = wrapSliceWithCommonFunctions({
  name: 'auth',
  initialState: InitialState,
  reducers: {
    setIdleState: (state) => {
      state.status = 'idle';
      state.requestStatus = undefined;
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
  },
});

export const { setIdleState } = authSlice.actions;

export default authSlice.reducer;

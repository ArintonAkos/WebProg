import { Middleware } from 'redux';
import { RootState } from '../index';
import { logoutUser, updateTokens } from '../../reducers/authReducer';

const authenticationMiddleware: Middleware<{}, RootState> =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    const result = next(action);

    if (action.type.endsWith('/fulfilled')) {
      const payload: any = action.payload;

      if (payload?.data?.tokens) {
        const { accessToken, refreshToken } = payload.data.tokens;

        if (accessToken && refreshToken) {
          dispatch(updateTokens({ token: accessToken, refreshToken }));
        }
      }
    }

    if (action.type.endsWith('/rejected')) {
      const payload: any = action.payload;

      if (payload && payload.status === 401) {
        dispatch(logoutUser());
      }
    }

    return result;
  };

export default authenticationMiddleware;

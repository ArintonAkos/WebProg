import jwtDecode, { JwtPayload } from 'jwt-decode';
import { refreshToken } from '../../services/authService';
import { Dispatch, Middleware } from 'redux';
import { RootState } from '../index';
import { Action } from '@reduxjs/toolkit';
import { updateTokens } from '../../reducers/authReducer';

const InitialUser = {
  token: '',
  refreshToken: '',
};

const authMiddleware: Middleware<{}, RootState, Dispatch<Action>> = (store) => (next) => async (action) => {
  if (action?.needsAuthorization !== true) {
    return next(action);
  }

  const { auth } = store.getState();
  const { token, refreshToken: rt } = auth.user ?? InitialUser;

  if (token) {
    const decodedToken = jwtDecode<JwtPayload>(token!);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp ?? -1 < currentTime) {
      if (rt) {
        try {
          const { token, refreshToken: receivedRefreshToken } = await refreshToken(rt!);

          store.dispatch(updateTokens({ token, refreshToken: receivedRefreshToken }));
        } catch (error) {
          console.error('Error refreshing token:', error);
          return;
        }
      }
    }
  }

  return next(action);
};

export default authMiddleware;

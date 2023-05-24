import { Dispatch, Middleware } from 'redux';
import { RootState } from '../index';
import { Action } from '@reduxjs/toolkit';
import { AuthHeader } from '../../services/httpRequest';

const authMiddleware: Middleware<{}, RootState, Dispatch<Action>> = (store) => (next) => async (action) => {
  if (typeof action === 'function') {
    const { token, refreshToken } = store.getState().auth.userData;
    let authHeader: AuthHeader = {};

    if (token) {
      authHeader = {
        Authorization: `Bearer ${token}`,
      };
    }

    if (refreshToken) {
      authHeader = {
        ...authHeader,
        'x-refresh-token': refreshToken,
      };
    }

    action.meta = {
      ...action.meta,
      headers: {
        ...action.meta?.headers,
        ...authHeader,
      },
    };
  }

  return next(action);
};

export default authMiddleware;

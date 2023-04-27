import { Middleware, Dispatch } from 'redux';
import { RootState } from '../index';
import { Action } from '@reduxjs/toolkit';
import { capitalizeFirstLetter, includesAny } from '../../utils/stringUtils';

const updateActionMiddleware: Middleware<
  {}, // S parameter: RootState,
  RootState, // D parameter: RootState
  Dispatch<Action> // Dispatch parameter: Dispatch<AnyAction>
> = (storeAPI) => (next) => (action) => {
  if (!includesAny(action.meta?.requestStatus, ['rejected', 'fulfilled'])) {
    return next({ ...action });
  }

  if (includesAny(action.meta?.requestStatus, ['rejected'])) {
    action.requestStatus = {
      type: 'error',
      description: action.error.message,
      showToast: true,
      title: 'Error',
    };

    return next({ ...action });
  }

  if (action.payload?.type) {
    if (!action.payload) {
      action.payload = {};
    }

    action.requestStatus = {
      type: action.payload.type,
      description: action.payload.message,
      showToast: action.payload.showToast,
      title: capitalizeFirstLetter(action.payload.type),
    };
  }

  if (action.payload?.type === 'error') {
    if (!action.payload) {
      action.payload = {};
    }

    action.payload.error = action.payload.message;
  }

  delete action.payload.type;
  delete action.payload.message;
  delete action.payload.showToast;

  return next({ ...action });
};

export default updateActionMiddleware;

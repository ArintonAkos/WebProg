import React from 'react';
import { ActionReducerMapBuilder, AnyAction, AsyncThunk, Draft } from '@reduxjs/toolkit';

export interface RequestStatus {
  type?: 'success' | 'error' | 'warning';
  description?: string;
  showToast?: boolean;
  title?: string;
}

export interface GlobalAction<T = string> extends AnyAction {
  requestStatus?: RequestStatus;
}

interface RenderAsyncStateProps {
  pending: React.ComponentType;
  fulfilled: React.ComponentType;
  rejected: React.ComponentType;
  actionType: string;
}

type AsyncThunkCallbacks<State> = {
  pending?: (state: Draft<State>, action: GlobalAction) => void;
  fulfilled?: (state: Draft<State>, action: GlobalAction) => void;
  rejected?: (state: Draft<State>, action: GlobalAction) => void;
};

export const mapAsyncThunkToGlobalAction = <CustomRootState, ThunkArg>(
  builder: ActionReducerMapBuilder<CustomRootState>,
  asyncThunk: AsyncThunk<any, ThunkArg, {}>,
  callbacks: AsyncThunkCallbacks<CustomRootState>,
) => {
  const { pending, fulfilled, rejected } = callbacks;

  if (pending) {
    builder.addMatcher(
      (action) => action.type === asyncThunk.pending.type,
      (state, action: GlobalAction) => {
        pending(state, action);
      },
    );
  }

  if (fulfilled) {
    builder.addMatcher(
      (action) => action.type === asyncThunk.fulfilled.type,
      (state, action: GlobalAction) => {
        fulfilled(state, action);
      },
    );
  }

  if (rejected) {
    builder.addMatcher(
      (action) => action.type === asyncThunk.rejected.type,
      (state, action: GlobalAction) => {
        rejected(state, action);
      },
    );
  }
};

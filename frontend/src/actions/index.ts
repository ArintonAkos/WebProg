import { ActionReducerMapBuilder, AnyAction, AsyncThunk, Draft } from '@reduxjs/toolkit';

export interface GlobalAction<Payload = unknown> extends AnyAction {
  payload: Payload;
}

type AsyncThunkCallbacks<State, Returned> = {
  pending?: (state: Draft<State>, action: GlobalAction) => void;
  fulfilled?: (state: Draft<State>, action: GlobalAction<Returned>) => void;
  rejected?: (state: Draft<State>, action: GlobalAction) => void;
};

export const mapAsyncThunkToGlobalAction = <CustomRootState, Returned, ThunkArg>(
  builder: ActionReducerMapBuilder<CustomRootState>,
  asyncThunk: AsyncThunk<Returned, ThunkArg, {}>,
  callbacks: AsyncThunkCallbacks<CustomRootState, Returned>,
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
      (state, action: any) => {
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

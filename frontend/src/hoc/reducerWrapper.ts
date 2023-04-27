import { createSlice, Slice, SliceCaseReducers } from '@reduxjs/toolkit';
import { CaseReducerWithPrepare, CreateSliceOptions } from '@reduxjs/toolkit/src/createSlice';
import { commonReducers } from '../reducers/commonReducers';
import { CaseReducer } from '@reduxjs/toolkit/src/createReducer';
import { PayloadAction } from '@reduxjs/toolkit/src/createAction';

export const wrapSliceWithCommonFunctions = <
  State,
  CaseReducers extends SliceCaseReducers<State>,
  Name extends string = string,
>(
  options: CreateSliceOptions<State, CaseReducers, Name>,
): Slice<
  State,
  CaseReducers & {
    [K: string]:
      | CaseReducer<State, PayloadAction<any>>
      | CaseReducerWithPrepare<State, PayloadAction<any, string, any, any>>;
  }
> => {
  const { reducers, ...sliceOptions } = options;

  const mergedReducers = {
    ...reducers,
    ...commonReducers,
  };

  return createSlice<
    State,
    CaseReducers & {
      [K: string]:
        | CaseReducer<State, PayloadAction<any>>
        | CaseReducerWithPrepare<State, PayloadAction<any, string, any, any>>;
    }
  >({
    ...sliceOptions,
    reducers: mergedReducers,
  });
};

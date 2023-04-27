import { CustomRootState } from '../store/state';
import { Draft } from 'immer';
import { AnyAction } from '@reduxjs/toolkit';

export type CustomReducer = (state: Draft<CustomRootState>, action: AnyAction) => void;

export const setShowToast: CustomReducer = (state, action: AnyAction) => {
  if (state.requestStatus) {
    state.requestStatus.showToast = action.payload;
  }
};

const commonReducerMapper = (reducers: CustomReducer[]) => {
  const mappedReducers: { [key: string]: any } = {};

  reducers.forEach((commonReducer: CustomReducer) => {
    mappedReducers[commonReducer.name] = commonReducer;
  });

  return mappedReducers;
};

const reducers = [setShowToast];
export const commonReducers: { [key: string]: CustomReducer } = commonReducerMapper(reducers);

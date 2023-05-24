import { useDispatch } from 'react-redux';
import type { RootState } from '../store';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';

type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>;

const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();

export default useAppDispatch;

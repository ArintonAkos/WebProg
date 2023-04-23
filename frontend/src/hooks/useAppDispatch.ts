import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux';

import type { AppDispatch } from '../store';

const useAppDispatch = () => useDispatch<AppDispatch>();

export default useAppDispatch;

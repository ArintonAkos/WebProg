import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useCustomToast } from './useCustomToast';
import useAppDispatch from './useAppDispatch';

type RootStateKey = keyof RootState;

const selectStatus =
  <K extends RootStateKey>(reducer: K) =>
  (state: RootState) =>
    state[reducer]!.status;
const selectError =
  <K extends RootStateKey>(reducer: K) =>
  (state: RootState) =>
    state[reducer]!.error;
const selectRequestStatus =
  <K extends RootStateKey>(reducer: K) =>
  (state: RootState) =>
    state[reducer]!.requestStatus;

const useStateHandling = <K extends RootStateKey>(reducerKey: K) => {
  const status = useSelector(selectStatus(reducerKey));
  const error = useSelector(selectError(reducerKey));
  const responseMessage = useSelector(selectRequestStatus(reducerKey));
  const showToast = useCustomToast();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (responseMessage?.showToast) {
      showToast({
        type: responseMessage.type,
        title: responseMessage.title ?? '',
        description: responseMessage.description,
      });

      const action = {
        type: `${reducerKey as string}/setShowToast`,
        payload: false,
      };

      dispatch(action);
    }
  }, [responseMessage, showToast, reducerKey, dispatch]);

  return { status, error };
};

export default useStateHandling;

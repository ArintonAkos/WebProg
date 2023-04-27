import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Loading from '../components/shared/Loading';
import Error from '../components/shared/Error';
import { useCustomToast } from '../hooks/useCustomToast';
import { RootState } from '../store';

const selectStatus =
  <K extends keyof RootState>(reducer: K) =>
  (state: RootState) =>
    state[reducer]!.status;
const selectError =
  <K extends keyof RootState>(reducer: K) =>
  (state: RootState) =>
    state[reducer]!.error;
const selectRequestStatus =
  <K extends keyof RootState>(reducer: K) =>
  (state: RootState) =>
    state[reducer]!.requestStatus;

const withLoadingAndErrorFromState = <K extends keyof RootState>(WrappedComponent: React.ComponentType, reducer: K) => {
  return (props: React.ComponentProps<typeof WrappedComponent>) => {
    const status = useSelector(selectStatus(reducer));
    const error = useSelector(selectError(reducer));
    const responseMessage = useSelector(selectRequestStatus(reducer));
    const showToast = useCustomToast();

    useEffect(() => {
      if (responseMessage?.showToast) {
        showToast({
          type: responseMessage.type,
          title: responseMessage.title ?? '',
          description: responseMessage.description,
        });
      }
    }, [responseMessage, showToast]);

    if (status === 'loading') {
      return <Loading />;
    }

    if (status === 'failed') {
      return <Error title="An error occurred" description={error ?? ''} />;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withLoadingAndErrorFromState;

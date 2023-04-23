import React from 'react';
import { useSelector } from 'react-redux';
import Loading from '../components/shared/Loading';
import Error from '../components/shared/Error';
import { useCustomToast } from '../hooks/useCustomToast';

const withLoadingAndErrorFromState = (WrappedComponent: React.ComponentType) => {
  return (props: React.ComponentProps<typeof WrappedComponent>) => {
    const status = useSelector((state: any) => state?.data?.status);
    const error = useSelector((state: any) => state?.data?.error);

    const responseMessage = useSelector((state: any) => state?.data?.responseStatus);

    if (responseMessage?.showToast) {
      const showToast = useCustomToast();

      showToast({
        type: responseMessage.type,
        title: responseMessage.title,
        description: responseMessage.description,
      });
    }

    if (status === 'loading') {
      return <Loading />;
    }

    if (status === 'failed') {
      return <Error title="An error occurred" description={error} />;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withLoadingAndErrorFromState;

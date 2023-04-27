import React from 'react';
import Loading from './Loading';
import Error from './Error';

interface StatusHandlerProps {
  status: string;
  error: string | null | undefined;
  children: React.ReactNode;
}

const StatusHandler: React.FC<StatusHandlerProps> = ({ status, error, children }) => {
  if (status === 'loading') {
    return <Loading />;
  }

  if (status === 'failed') {
    return <Error title="An error occurred" description={error ?? ''} />;
  }

  return <>{children}</>;
};

export default StatusHandler;

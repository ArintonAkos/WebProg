import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import useStateHandling from '../../hooks/useStateHandling';
import useAppDispatch from '../../hooks/useAppDispatch';
import { logoutUser } from '../../reducers/authReducer';
import { Container, Text } from '@chakra-ui/react';
import StatusHandler from '../../components/shared/StatusHandler';

const LogoutPage: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.userData.user);
  const { status, error } = useStateHandling('auth');
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(logoutUser());
  }, [dispatch]);

  if (!user) {
    return <Navigate to={'/'} />;
  }

  return (
    <StatusHandler status={status} error={error}>
      <Container mt={5}>
        <Text fontSize="2xl" mb={5}>
          Logout
        </Text>
      </Container>
    </StatusHandler>
  );
};

export default LogoutPage;

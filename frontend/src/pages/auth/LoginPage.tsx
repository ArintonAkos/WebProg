import React, { useEffect } from 'react';
import { Container, Text } from '@chakra-ui/react';
import Form, { FormFieldProps } from '../../components/form';
import Joi from 'joi';
import useStateHandling from '../../hooks/useStateHandling';
import { Navigate, useNavigate } from 'react-router-dom';
import useAppDispatch from '../../hooks/useAppDispatch';
import { loginUser } from '../../actions/authAction';
import { setIdleState } from '../../reducers/authReducer';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

const loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().min(8).required(),
});

const loginFields: FormFieldProps[] = [
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    required: true,
    placeHolder: 'Enter your email',
    autoComplete: 'username',
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    required: true,
    placeHolder: 'Enter your password',
    autoComplete: 'current-password',
  },
];

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.userData.user);
  const { status } = useStateHandling('auth');
  const dispatch = useAppDispatch();
  const methods = useForm({
    resolver: joiResolver(loginSchema),
  });

  const onSubmit = (data: any) => {
    dispatch(loginUser(data));
  };

  useEffect(() => {
    if (status === 'succeeded') {
      dispatch(setIdleState());
      navigate('/');
    }
  }, [status, navigate, dispatch]);

  if (user) {
    return <Navigate to={'/'} />;
  }

  return (
    <Container mt={5}>
      <Text fontSize="2xl" mb={5}>
        Login
      </Text>
      <Form fields={loginFields} onSubmit={onSubmit} submitText="Login" methods={methods} />
    </Container>
  );
};

export default LoginPage;

// LoginPage.tsx
import React, { useEffect } from 'react';
import { Container, Text } from '@chakra-ui/react';
import Form, { FormFieldProps } from '../../components/form';
import Joi from 'joi';
import useStateHandling from '../../hooks/useStateHandling';
import { useNavigate } from 'react-router-dom';
import useAppDispatch from '../../hooks/useAppDispatch';
import { loginUser } from '../../actions/authAction';
import { setIdleState } from '../../reducers/authReducer';

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
  const { status } = useStateHandling('auth');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = (data: any) => {
    dispatch(loginUser(data));
  };

  useEffect(() => {
    if (status === 'succeeded') {
      dispatch(setIdleState());
      navigate('/');
    }
  }, [status, navigate, dispatch]);

  return (
    <Container mt={5}>
      <Text fontSize="2xl" mb={5}>
        Login
      </Text>
      <Form fields={loginFields} onSubmit={onSubmit} submitText="Login" validationSchema={loginSchema} />
    </Container>
  );
};

export default LoginPage;

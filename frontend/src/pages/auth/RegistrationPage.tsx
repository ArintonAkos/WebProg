import React, { useEffect } from 'react';
import { Container, Text } from '@chakra-ui/react';
import Form, { FormFieldProps } from '../../components/form';
import Joi from 'joi';
import useStateHandling from '../../hooks/useStateHandling';
import { Navigate, useNavigate } from 'react-router-dom';
import useAppDispatch from '../../hooks/useAppDispatch';
import { registerUser } from '../../actions/authAction';
import { setIdleState } from '../../reducers/authReducer';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const registrationSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().min(8).required(),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
    'any.only': 'Passwords do not match',
  }),
});

const registerFields: FormFieldProps[] = [
  {
    name: 'name',
    label: 'First and Last Name',
    type: 'text',
    required: true,
    placeHolder: 'Arinton Akos',
  },
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
    autoComplete: 'new-password',
  },
  {
    name: 'confirmPassword',
    label: 'Confirm Password',
    type: 'password',
    required: true,
    placeHolder: 'Confirm your password',
    autoComplete: 'new-password',
  },
];

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.userData.user);

  if (user) {
    navigate('/');
  }

  const { status } = useStateHandling('auth');
  const dispatch = useAppDispatch();

  const onSubmit = (data: any) => {
    dispatch(registerUser(data));
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
        Registration
      </Text>
      <Form fields={registerFields} onSubmit={onSubmit} submitText="Register" validationSchema={registrationSchema} />
    </Container>
  );
};

export default RegisterPage;

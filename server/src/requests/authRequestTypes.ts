import Request from '../types/request.types';

interface RegisterUserProps {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterUserRequest extends Request {
  body: RegisterUserProps;
}

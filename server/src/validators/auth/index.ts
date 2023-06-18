import { loginSchema, refreshTokenSchema, registerSchema } from './schemas';
import { validationMiddleware } from '../../middlewares/validationMiddleware';

export const validateLogin = validationMiddleware(loginSchema);

export const validateRegister = validationMiddleware(registerSchema);

export const validateRefreshToken = validationMiddleware(refreshTokenSchema);

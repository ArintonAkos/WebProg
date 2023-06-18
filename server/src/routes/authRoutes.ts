import express from 'express';
import { login, refreshToken, register } from '../controllers/authController';
import { validateLogin, validateRefreshToken, validateRegister } from '../validators/auth';

const router = express.Router();

router.post('/login', validateLogin, login);
router.post('/register', validateRegister, register);
router.post('/refresh-token', validateRefreshToken, refreshToken);

export default router;

import express from 'express';
import { login, refreshToken, register } from '../controllers/authController';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/refresh-token', refreshToken);

export default router;

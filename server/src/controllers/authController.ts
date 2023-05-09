import { Request, Response } from 'express';
import UserModel from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config/config';

export const register = async (req: Request, res: Response) => {
  const { name, email, password, confirmPassword } = req.body;

  if (password.length < 8) {
    return res.status(400).json({ message: 'Password must be at least 8 characters long', showToast: true });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match', showToast: true });
  }

  try {
    let user = await UserModel.findOne({ email });

    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    user = new UserModel({
      name,
      email,
      password: passwordHash,
    });

    await user.save();

    res.status(201).json({ message: 'User registered successfully', showToast: true });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: err.message, showToast: true });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne((u) => u.email === email);

  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  try {
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ name: user.name }, config.jwtSecret, {
        expiresIn: config.jwtExpiry,
      });

      const refreshToken = jwt.sign({ name: user.name }, config.refreshTokenSecret, {
        expiresIn: config.refreshTokenExpiry,
      });

      res.json({ token, refreshToken });
    } else {
      res.status(400).json({ message: 'Invalid password' });
    }
  } catch {
    res.status(500).json({ message: 'An error occurred during login' });
  }
};

export const refreshToken = (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).send('Refresh token is required');
  }

  try {
    const decoded = jwt.verify(refreshToken, config.refreshTokenSecret) as any;

    const newToken = jwt.sign({ name: decoded.name }, config.jwtSecret, {
      expiresIn: config.jwtExpiry,
    });

    const newRefreshToken = jwt.sign({ name: decoded.name }, config.refreshTokenSecret, {
      expiresIn: config.refreshTokenExpiry,
    });

    res.json({ token: newToken, refreshToken: newRefreshToken });
  } catch (err) {
    res.status(403).send('Invalid refresh token');
  }
};

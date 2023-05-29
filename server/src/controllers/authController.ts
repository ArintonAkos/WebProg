import { Response } from 'express';
import User from '../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import Request from '../types/request.types';
import { IRole } from '../models/role';
import { IPopulatedUser, IPopulatedUserDocument } from '../types/user.types';
import { IPermission } from '../models/permission';
import RoleRepository from '../redis/repositories/RoleRepository';

export const register = async (req: Request, res: Response) => {
  const { name, email, password, confirmPassword } = req.body;

  if (password.length < 8) {
    return res.status(400).json({ message: 'Password must be at least 8 characters long', showToast: true });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match', showToast: true });
  }

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const userRole = await RoleRepository.getRole('User');

    user = new User({
      name,
      email,
      password: passwordHash,
      roles: [userRole],
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

  const user: IPopulatedUserDocument | undefined = await User.findOne({ email })
    .populate({
      path: 'roles',
      populate: {
        path: 'permissions',
        model: 'Permission',
      },
    })
    .populate('adminRestaurants');

  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  try {
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ name: user.name, email: user.email, id: user._id }, config.jwtSecret, {
        expiresIn: config.jwtExpiry,
      });

      const refreshToken = jwt.sign({ name: user.name, email: user.email, id: user._id }, config.refreshTokenSecret, {
        expiresIn: config.refreshTokenExpiry,
      });

      const publicUser = userToPublicUser(user);

      res.json({ token, refreshToken, user: publicUser });
    } else {
      res.status(400).json({ message: 'Invalid password' });
    }
  } catch {
    res.status(500).json({ message: 'An error occurred during login' });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).send('Refresh token is required');
  }

  try {
    const decoded = jwt.verify(refreshToken, config.refreshTokenSecret) as any;

    const user: IPopulatedUserDocument | undefined = await User.findOne({ name: decoded.name })
      .populate({
        path: 'roles',
        populate: {
          path: 'permissions',
          model: 'Permission',
        },
      })
      .populate('adminRestaurants');

    if (!user) {
      return res.status(404).send('User not found');
    }

    const newToken = jwt.sign({ name: decoded.name, email: user.email, id: user._id }, config.jwtSecret, {
      expiresIn: config.jwtExpiry,
    });

    const newRefreshToken = jwt.sign(
      { name: decoded.name, email: user.email, id: user._id },
      config.refreshTokenSecret,
      {
        expiresIn: config.refreshTokenExpiry,
      },
    );

    const publicUser = userToPublicUser(user as IPopulatedUserDocument);

    res.json({
      token: newToken,
      refreshToken: newRefreshToken,
      user: publicUser,
    });
  } catch (err) {
    res.status(403).send('Invalid refresh token');
  }
};

const userToPublicUser = (user: IPopulatedUserDocument): IPopulatedUser => {
  const permissionsSet = new Set<IPermission>();
  user.roles.forEach((role) => {
    role.permissions.forEach((permission) => {
      permissionsSet.add(permission);
    });
  });

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    roles: user.roles as IRole[],
    permissions: Array.from(permissionsSet),
    adminRestaurants: user.adminRestaurants,
  };
};

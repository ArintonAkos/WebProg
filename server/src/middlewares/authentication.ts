import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Response } from 'express';
import { Types } from 'mongoose';
import config from '../config/config';
import TokenService from '../services/tokenService';
import User from '../models/user';
import Request from '../types/request.types';
import RoleRepository from '../redis/repositories/RoleRepository';
import { IPopulatedUser, IUser } from '../types/user.types';
import PermissionRepository from '../redis/repositories/PermissionRepository';

class ErrorMessage {
  status: number;
  json: object;

  constructor(status: number, json: object) {
    this.status = status;
    this.json = json;
  }
}

const getGuest = async (): Promise<IPopulatedUser> => {
  const guestRole = await RoleRepository.getRole('Guest');
  const guestPermissions = await PermissionRepository.getPermissionsForRole('Guest');

  return {
    id: new Types.ObjectId(),
    name: 'Guest',
    email: '',
    roles: guestRole ? [guestRole] : [],
    permissions: guestPermissions || [],
    adminRestaurants: [],
  } as IPopulatedUser;
};

const isPopulatedUser = (user: IUser | IPopulatedUser): user is IPopulatedUser =>
  (user as IPopulatedUser).roles !== undefined &&
  (user as IPopulatedUser).roles.length > 0 &&
  typeof (user as IPopulatedUser).roles[0] !== 'string';

const getUser = async (userId?: string): Promise<IPopulatedUser | ErrorMessage> => {
  const user = (await User.findById(userId).populate('roles').populate('adminRestaurants').exec()).toObject();

  if (!user) {
    return new ErrorMessage(404, { error: 'User not found.' });
  }

  if (isPopulatedUser(user)) {
    return {
      ...user,
      id: new Types.ObjectId(user._id),
    };
  }
  return new ErrorMessage(500, { error: 'User is not populated.' });
};

const authentication = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    if (!token) {
      req.user = await getGuest();

      return next();
    }

    try {
      const userData = jwt.verify(token, config.jwtSecret) as JwtPayload;
      const user = await getUser(userData?.id);

      if (user instanceof ErrorMessage) {
        return res.status(user.status).json(user.json);
      }

      req.user = user;

      return next();
    } catch (err) {
      if (err instanceof jwt.TokenExpiredError) {
        const refreshToken = req.headers['x-refresh-token'];

        if (!refreshToken) {
          return res.status(403).json({ error: 'Refresh token not provided.' });
        }

        try {
          const userData = jwt.verify(refreshToken as string, config.refreshTokenSecret) as JwtPayload;

          const user = await getUser(userData?.id);

          if (user instanceof ErrorMessage) {
            return res.status(user.status).json(user.json);
          }

          const { newToken, newRefreshToken } = TokenService.generateTokens(userData);

          req.headers.authorization = `Bearer ${newToken}`;
          req.headers['x-refresh-token'] = newRefreshToken;
          req.newTokens = {
            token: newToken,
            refreshToken: newRefreshToken,
          };
          req.user = user;

          return next();
        } catch (err) {
          return res.status(403).json({ error: 'Invalid refresh token.' });
        }
      } else {
        return res.status(403).json({ error: 'Invalid token.' });
      }
    }
  } else {
    req.user = await getGuest();

    return next();
  }
};

export default authentication;

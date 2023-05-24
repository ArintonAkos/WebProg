import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config/config';
import TokenService from '../services/tokenService';
import User from '../models/user';
import { NextFunction, Response } from 'express';
import Request from '../types/request.types';
import RoleRepository from '../redis/repositories/RoleRepository';
import { IPopulatedUser, IUser } from '../types/user.types';
import PermissionRepository from '../redis/repositories/PermissionRepository';

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

      next();
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
          req.user = user;

          next();
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

class ErrorMessage {
  status: number;
  json: Object;

  constructor(status: number, json: Object) {
    this.status = status;
    this.json = json;
  }
}

const getGuest = async (): Promise<IPopulatedUser> => {
  const guestRole = await RoleRepository.getRole('Guest');
  const guestPermissions = await PermissionRepository.getPermissionsForRole('Guest');

  return {
    name: 'Guest',
    email: '',
    roles: guestRole ? [guestRole] : [],
    permissions: guestPermissions ? guestPermissions : [],
  } as IPopulatedUser;
};

const getUser = async (userId?: string): Promise<IPopulatedUser | ErrorMessage> => {
  const user = await User.findById(userId).populate('roles').exec();

  if (!user) {
    return {
      status: 404,
      json: { error: 'User not found.' },
    };
  }

  if (isPopulatedUser(user)) {
    return user;
  } else {
    return {
      status: 500,
      json: { error: 'User is not populated.' },
    };
  }
};

const isPopulatedUser = (user: IUser | IPopulatedUser): user is IPopulatedUser => {
  return (
    (user as IPopulatedUser).roles !== undefined &&
    (user as IPopulatedUser).roles.length > 0 &&
    typeof (user as IPopulatedUser).roles[0] !== 'string'
  );
};

export default authentication;

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

  console.log('Authentication', authHeader);
  if (authHeader) {
    const token = authHeader.split(' ')[1];

    console.log('A token: ', token, authHeader);
    if (!token) {
      req.user = await getGuest();

      return next();
    }

    try {
      const userData = jwt.verify(token, config.jwtSecret) as JwtPayload;
      const user = await getUser(userData?.id);

      console.log('User data: ', userData);
      if (user instanceof ErrorMessage) {
        console.log('A');
        return res.status(user.status).json(user.json);
      }

      req.user = user;

      console.log('B', user);
      next();
    } catch (err) {
      if (err instanceof jwt.TokenExpiredError) {
        const refreshToken = req.headers['x-refresh-token'];

        if (!refreshToken) {
          console.log('C');
          return res.status(403).json({ error: 'Refresh token not provided.' });
        }

        try {
          const userData = jwt.verify(refreshToken as string, config.refreshTokenSecret) as JwtPayload;

          console.log('UserData: userData');
          const user = await getUser(userData?.id);

          console.log('A felhasznalo: ', user);
          if (user instanceof ErrorMessage) {
            console.log('Bejottem ide is1123');
            return res.status(user.status).json(user.json);
          }

          const { newToken, newRefreshToken } = TokenService.generateTokens(userData);

          req.headers.authorization = `Bearer ${newToken}`;
          req.headers['x-refresh-token'] = newRefreshToken;
          req.user = user;

          console.log('D');
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

    console.log('Bejottema guestbe');
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
    adminRestaurants: [],
  } as IPopulatedUser;
};

const getUser = async (userId?: string): Promise<IPopulatedUser | ErrorMessage> => {
  console.log('Get user: ', userId);
  const user = await User.findById(userId).populate('roles').populate('adminRestaurants').exec();

  if (!user) {
    return new ErrorMessage(404, { error: 'User not found.' });
  }

  if (isPopulatedUser(user)) {
    return user;
  } else {
    return new ErrorMessage(500, { error: 'User is not populated.' });
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

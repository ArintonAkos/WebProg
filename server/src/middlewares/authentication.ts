import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config/config';
import TokenService from '../services/tokenService';
import User from '../models/user';

const authentication = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    try {
      const userData = jwt.verify(token, config.jwtSecret) as JwtPayload;

      const user = await User.findById(userData?.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
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
          const userData = jwt.verify(refreshToken, config.refreshTokenSecret) as JwtPayload;

          const user = await User.findById(userData?.id);
          if (!user) {
            return res.status(404).json({ error: 'User not found.' });
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
    return res.status(401).json({ error: 'Authorization header must be provided.' });
  }
};

export default authentication;

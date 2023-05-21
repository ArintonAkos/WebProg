import Token from '../models/token';
import config from '../config/config';
import jwt from 'jsonwebtoken';

const TokenService = {
  generateTokens: (userData) => {
    const newToken = jwt.sign({ id: userData._id }, config.jwtSecret, { expiresIn: config.jwtExpiry });
    const newRefreshToken = jwt.sign({ id: userData._id }, config.refreshTokenSecret, {
      expiresIn: config.refreshTokenExpiry,
    });

    return { newToken, newRefreshToken };
  },

  storeTokens: async (tokens, userId) => {
    const token = new Token({
      ...tokens,
      userId,
    });

    await token.save();
  },

  updateTokens: async (newToken, newRefreshToken, userId) => {
    const updatedToken = await Token.findOneAndUpdate(
      { userId },
      { token: newToken, refreshToken: newRefreshToken },
      { new: true },
    );
    if (!updatedToken) {
      throw new Error('Token not found');
    }
  },
};

export default TokenService;

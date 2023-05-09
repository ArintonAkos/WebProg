import { post } from './httpRequest';

export const refreshToken = async (refreshToken: string) => {
  return await post('auth/refresh-token', { refreshToken });
};

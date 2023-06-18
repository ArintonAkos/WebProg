import { model, Schema } from 'mongoose';
import { IRefreshToken } from '../types/refreshToken.types';

const RefreshTokenSchema = new Schema<IRefreshToken>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    token: { type: String, required: true },
  },
  {
    timestamps: true,
    expires: '7d',
  },
);

const RefreshToken = model<IRefreshToken>('RefreshToken', RefreshTokenSchema);

export default RefreshToken;

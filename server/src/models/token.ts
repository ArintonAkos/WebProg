import mongoose, { Schema, Types } from 'mongoose';

export interface IToken {
  token: string;
  refreshToken: string;
  user: Types.ObjectId;
}

const TokenSchema = new mongoose.Schema<IToken>({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  refreshToken: {
    type: String,
    required: true,
    unique: true,
  },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

const Token = mongoose.model('Token', TokenSchema);

export default Token;

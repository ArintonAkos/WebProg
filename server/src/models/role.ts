import { model, PopulatedDoc, Schema, Types, Document } from 'mongoose';
import { IPermission } from './permission';

export interface IRole {
  name: string;
  permissions: PopulatedDoc<Document<Types.ObjectId> & IPermission>[];
}

const roleSchema = new Schema<IRole>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  permissions: [{ type: Types.ObjectId, ref: 'Permission' }],
});

const Role = model<IRole>('Role', roleSchema);

export default Role;

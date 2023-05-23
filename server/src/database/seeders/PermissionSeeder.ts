import Permission, { IPermission } from '../../models/permission';
import Seeder from './Seeder';
import Action from '../../types/action';
import Subject from '../../types/subjects';

const permissions: IPermission[] = [];

for (const action in Action) {
  for (const subject in Subject) {
    const permission: IPermission = {
      name: `${Action[action]} ${Subject[subject]}`,
      subject: Subject[subject],
      description: `${Action[action]} permission for ${Subject[subject]}`,
    };

    permissions.push(permission);
  }
}

export default new Seeder<IPermission>(Permission, permissions);

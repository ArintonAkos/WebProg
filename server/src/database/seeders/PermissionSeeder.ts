import Permission, { IPermission } from '../../models/permission';
import Seeder from './Seeder';
import Action from '../../types/action.types';
import Subject from '../../types/subject.types';
import PermissionRepository from '../../redis/repositories/PermissionRepository';

const permissions: IPermission[] = [];

for (const action in Action) {
  for (const subject in Subject) {
    const permission: IPermission = {
      name: `${Action[action]} ${Subject[subject]}`,
      action: Action[action],
      subject: Subject[subject],
      description: `${Action[action]} permission for ${Subject[subject]}`,
    };

    permissions.push(permission);
  }
}

const onComplete = async () => {
  await PermissionRepository.clearAll();
};

export default new Seeder<IPermission>(Permission, permissions, onComplete);

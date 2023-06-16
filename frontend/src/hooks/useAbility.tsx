import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Permission } from '../models/permission';
import { MongoAbility } from '@casl/ability';
import { defineAbilitiesFor } from '../ability/defineAbilitiesFor';
import { guestPermissions } from '../ability/guestPermissions';

const useAbility = (): MongoAbility => {
  const permissions: Permission[] =
    useSelector((state: RootState) => state.auth.userData.user?.permissions) || guestPermissions;
  return defineAbilitiesFor(permissions);
};

export default useAbility;

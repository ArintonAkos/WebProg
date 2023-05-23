import { createMongoAbility, ExtractSubjectType } from '@casl/ability';
import Subject from './subjects';
import Action from './action';

export type DefinedSubjects = ExtractSubjectType<Subject>;

const ability = createMongoAbility<[Action, Subject]>();

export default ability;

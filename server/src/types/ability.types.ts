import { createMongoAbility, ExtractSubjectType, MongoAbility, MongoQuery } from '@casl/ability';
import Subject from './subject.types';
import Action from './action.types';

export type DefinedSubjects = ExtractSubjectType<Subject>;

export type IAbility = MongoAbility<[Action, Subject], MongoQuery>;
const Ability: IAbility = createMongoAbility<[Action, Subject]>();

export default Ability;

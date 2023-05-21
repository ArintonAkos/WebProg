import { createMongoAbility, ExtractSubjectType } from '@casl/ability';

export type DefinedSubjects = ExtractSubjectType<Subject>;

const ability = createMongoAbility<[Action, Subject]>();

export default ability;

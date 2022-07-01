import { User } from './user.schema';

export type SimpleUser = Omit<User, 'password'>;

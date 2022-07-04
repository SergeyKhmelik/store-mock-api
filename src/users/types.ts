import { User } from './user.entity';

export type SimpleUser = Omit<User, 'password'>;

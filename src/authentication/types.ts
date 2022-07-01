import { User } from '../users/user.schema';

export interface TokenContent extends Omit<User, 'password'> {
  /* expires at: timestamp */
  exp: number;
  /* Issued at: timestamp */
  iat: number;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

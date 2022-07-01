import { SimpleUser } from '../users/types';

export interface TokenContent extends SimpleUser {
  /* expires at: timestamp */
  exp: number;
  /* Issued at: timestamp */
  iat: number;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

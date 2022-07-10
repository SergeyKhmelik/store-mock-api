import { SimpleUser } from '../../users/dto/simple-user.dto';

export class TokenContent extends SimpleUser {
  /* expires at: timestamp */
  exp: number;
  /* Issued at: timestamp */
  iat: number;
}

import { MinLength } from 'class-validator';

export class SignInDto {
  @MinLength(2)
  username: string;

  @MinLength(2)
  password: string;
}

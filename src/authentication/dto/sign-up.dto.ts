import { MinLength } from 'class-validator';
import { SignInDto } from './sign-in.dto';

export class SignUpDto extends SignInDto {
  @MinLength(2)
  firstName: string;

  @MinLength(2)
  lastName: string;
}

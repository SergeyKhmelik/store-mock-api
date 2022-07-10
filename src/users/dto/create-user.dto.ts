import { MinLength, IsString } from 'class-validator';

export class CreateUserDto {
  @MinLength(2)
  username: string;

  @MinLength(2)
  firstName: string;

  @MinLength(2)
  lastName: string;

  @MinLength(2)
  password: string;

  @IsString()
  avatar?: string;
}

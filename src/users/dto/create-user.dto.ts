import { IsString, IsDefined, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsDefined()
  @IsString()
  @MinLength(2)
  username: string;

  @IsDefined()
  @IsString()
  @MinLength(2)
  firstName: string;

  @IsDefined()
  @IsString()
  @MinLength(2)
  lastName: string;

  @IsDefined()
  @IsString()
  @MinLength(2)
  password: string;
}

import { MinLength, IsString } from 'class-validator';

export class CreateCategoryDto {
  @MinLength(2)
  name: string;

  @IsString()
  description?: string;

  @IsString()
  image?: string;
}

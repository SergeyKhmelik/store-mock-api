import { IsNumber, Min, Max, MaxLength } from 'class-validator';

export class CreateReviewDto {
  @IsNumber()
  @Min(0)
  @Max(5)
  rate: number;

  @MaxLength(5000)
  reviewMessage?: string;

  images?: string[];
}

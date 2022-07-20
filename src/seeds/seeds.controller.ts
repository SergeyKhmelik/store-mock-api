import { Controller, Post } from '@nestjs/common';
import { SeedsService } from './seeds.service';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../authentication/decorators/public.decorator';

@ApiTags('Seeder')
@Controller('seeds')
export class SeedsController {
  constructor(private readonly seedsService: SeedsService) {}

  @Public()
  @Post('clients')
  seedClients() {
    return this.seedsService.seedClients();
  }

  @Public()
  @Post('products')
  seedProducts() {
    return this.seedsService.seedProducts();
  }

  @Public()
  @Post('reviews')
  seedReviews() {
    return this.seedsService.seedReviews();
  }
}

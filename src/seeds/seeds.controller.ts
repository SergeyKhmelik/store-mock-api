import { Controller, Post } from '@nestjs/common';
import { SeedsService } from './seeds.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '../authentication/decorators/public.decorator';

@ApiTags('Seeder')
@Controller('seeds')
export class SeedsController {
  constructor(private readonly seedsService: SeedsService) {}

  @ApiOperation({
    description: 'Replaces all clients and generates new ones. Removes all reviews as well.',
  })
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

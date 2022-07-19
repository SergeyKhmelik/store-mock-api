import { Controller, Post } from '@nestjs/common';
import { SeedsService } from './seeds.service';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../authentication/decorators/public.decorator';

@ApiTags('Seeder controller')
@Controller('seeds')
export class SeedsController {
  constructor(private readonly seedsService: SeedsService) {}

  @Public()
  @Post('products')
  seedProducts() {
    return this.seedsService.seedProducts();
  }
}

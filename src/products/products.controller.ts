import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Public } from '../authentication/decorators/public.decorator';
import { ProductFilterDto } from './dto/product-filter.dto';
import { ProductsService } from './products.service';
import { PaginatedResponse } from '../utils/pagination.utils';
import { SimpleRatedProduct } from './product.entity';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Public()
  @Get()
  findAll(@Query() filters: ProductFilterDto): Promise<PaginatedResponse<SimpleRatedProduct>> {
    return this.productsService.findAllRated(filters);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument, SimpleProduct } from './product.entity';
import { ProductFilterDto } from './dto/product-filter.dto';
import { PaginatedResponse } from '../utils/pagination.utils';
import { productFilterSerializer } from './serializers/product-filter.serializer';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {}

  async findAll(filterDto: ProductFilterDto) {
    const filter = productFilterSerializer(filterDto);

    const total = await this.productModel.count(filter);
    const paginatedData = await this.productModel
      .find(filter, 'title material colors sizes price')
      .skip(filterDto.offset)
      .limit(filterDto.limit);

    return new PaginatedResponse<SimpleProduct>(paginatedData, filterDto.limit, filterDto.offset, total);
  }

  findOne(id: string) {
    return this.productModel.findById(id);
  }
}

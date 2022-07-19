import { ProductFilterDto } from '../dto/product-filter.dto';
import { FilterQuery } from 'mongoose';
import { Product } from '../product.entity';

export const productFilterSerializer = (filterDto: ProductFilterDto): FilterQuery<Product> => {
  const filter: FilterQuery<Product> = {};

  if (filterDto.title && filterDto.title.trim()) {
    filter.title = { $regex: new RegExp(filterDto.title.trim(), 'i') };
  }

  if (filterDto.material) {
    filter.material = filterDto.material;
  }

  if (filterDto.color) {
    filter.colors = filterDto.color;
  }

  if (filterDto.size) {
    filter.sizes = filterDto.size;
  }

  return filter;
};

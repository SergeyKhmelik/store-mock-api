import { ProductColors, ProductMaterials, ProductSizes } from '../product.entity';

export class ProductFilterDto {
  title?: string;

  color?: ProductColors;
  material?: ProductMaterials;
  size?: ProductSizes;

  limit?: number = 9;
  offset?: number = 0;
}

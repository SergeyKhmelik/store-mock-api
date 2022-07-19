import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from '../products/product.entity';
import { Model } from 'mongoose';

@Injectable()
export class SeedsService {
  constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {}

  public async seedProducts() {
    await this.productModel.deleteMany({});

    return await this.productModel.insertMany(Product.generateInstances());
  }

  public seedComments() {
    return `This action creates mock comments`;
  }
}

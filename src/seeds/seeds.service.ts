import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from '../products/product.entity';
import { Model } from 'mongoose';
import { Review, ReviewDocument } from '../reviews/review.entity';
import { User, UserDocument } from '../users/user.entity';
import { generateProducts } from './seeders/products.seeder';
import { generateReviews } from './seeders/reviews.seeder';
import { generateUsers } from './seeders/users.seeder';

@Injectable()
export class SeedsService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<ProductDocument>,
    @InjectModel(Review.name) private readonly reviewModel: Model<ReviewDocument>,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  public async seedClients() {
    await this.reviewModel.deleteMany({});
    await this.userModel.deleteMany({});
    return this.userModel.insertMany(await generateUsers());
  }

  public async seedProducts() {
    await this.productModel.deleteMany({});

    return await this.productModel.insertMany(generateProducts());
  }

  public async seedReviews() {
    await this.reviewModel.deleteMany({});

    const products = await this.productModel.find({}, { _id: 1 });
    const clients = await this.userModel.find({}, { _id: 1 });

    if (!products.length || !clients.length) {
      throw new HttpException(
        'Either users or products are empty. Need to seed those first.',
        HttpStatus.PRECONDITION_REQUIRED,
      );
    }

    const resultReviews = products.flatMap((product) => generateReviews(product, clients));
    return this.reviewModel.insertMany(resultReviews);
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review, ReviewDocument } from './review.entity';
import { User } from '../users/user.entity';
import { Product, ProductDocument } from '../products/product.entity';
import { SimpleUser } from '../users/dto/simple-user.dto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<ProductDocument>,
    @InjectModel(Review.name) private readonly reviewModel: Model<ReviewDocument>,
  ) {}

  async create(createReviewDto: CreateReviewDto, productId: string, author: SimpleUser) {
    const product = await this.productModel.findById<Product>(productId);

    if (!product) {
      throw new HttpException('Product with such id does not exist', HttpStatus.BAD_REQUEST);
    }

    return this.reviewModel.create<Review>({
      product,
      author: author as User, // TODO: we should think of this
      rate: createReviewDto.rate,
      reviewMessage: createReviewDto.reviewMessage,
      images: createReviewDto.images,
    });
  }

  findAll(productId: string) {
    return this.reviewModel
      .find<Review>({ product: productId })
      .populate<{ author: SimpleUser }>('author', 'firstName lastName avatar');
  }

  findOne(id: string) {
    return this.reviewModel.findById(id);
  }

  update(id: string, updateReviewDto: UpdateReviewDto, productId: string, requestUser: SimpleUser) {
    return this.reviewModel.findOneAndUpdate<Review>(
      {
        id: id,
        product: productId,
        author: requestUser.id,
      },
      updateReviewDto,
      {
        upsert: false,
      },
    );
  }

  remove(productId: string, id: string, requestUser: SimpleUser) {
    return this.reviewModel.findOneAndRemove<Review>({
      id: id,
      product: productId,
      author: requestUser.id,
    });
  }
}

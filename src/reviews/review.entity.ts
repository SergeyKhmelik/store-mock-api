import mongoose, { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DEFAULT_SCHEMA_OPTIONS } from '../utils/database.utils';
import { User } from '../users/user.entity';
import { Product } from '../products/product.entity';

export type ReviewDocument = Review & Document;

@Schema(DEFAULT_SCHEMA_OPTIONS)
export class Review {
  @Prop()
  id?: string;

  @Prop({ isRequired: true, maxLength: 5000 })
  reviewMessage: string;

  @Prop({ isRequired: true, min: 0, max: 5 })
  rate: number;

  @Prop()
  images: string[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  author: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
  product: Product;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);

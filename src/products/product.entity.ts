import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { DEFAULT_SCHEMA_OPTIONS } from '../utils/database.utils';

export type ProductDocument = Product & Document;

export type SimpleProduct = Omit<Product, 'description'>;

export interface SimpleRatedProduct extends SimpleProduct {
  rating: number;
}

export enum ProductSizes {
  XXS = 'XXS',
  XS = 'XS',
  S = 'S',
  M = 'M',
  L = 'L',
  XL = 'XL',
  XXL = 'XXL',
  XXXL = 'XXXL',
}

export enum ProductColors {
  White = 'white',
  Red = 'red',
  Blue = 'blue',
  Green = 'green',
  Yellow = 'yellow',
}

export enum ProductMaterials {
  Linen = 'linen',
  Cotton = 'cotton',
  Wool = 'wool',
  Cashmere = 'cashmere',
}

@Schema(DEFAULT_SCHEMA_OPTIONS)
export class Product {
  @Prop()
  id?: string;

  @Prop({ isRequired: true, minlength: 2, unique: true })
  title: string;

  @Prop({ isRequired: true, minLength: 10 })
  description: string;

  @Prop({ type: Number, isRequired: true })
  price: number;

  @Prop({ type: [{ type: String, enum: ProductSizes }] })
  sizes: ProductSizes[];

  @Prop({ type: [{ type: String, enum: ProductColors }] })
  colors: ProductColors[];

  @Prop({ type: String, enum: ProductMaterials })
  material: ProductMaterials;

  @Prop()
  images: string[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);

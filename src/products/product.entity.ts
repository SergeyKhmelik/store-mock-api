import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { DEFAULT_SCHEMA_OPTIONS } from '../utils/database.utils';
import { faker } from '@faker-js/faker';

export type ProductDocument = Product & Document;

export type SimpleProduct = Omit<Product, 'description'>;

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
  static generateInstances = (amount = 20): Array<Product> => {
    return Array.from(
      { length: amount },
      () =>
        ({
          title: faker.commerce.productName(),
          description: faker.commerce.productDescription(),
          price: parseFloat(faker.commerce.price(20, 700)),
          colors: faker.helpers.arrayElements(Object.values(ProductColors)),
          sizes: faker.helpers.arrayElements(Object.values(ProductSizes), 4),
          material: faker.helpers.arrayElement(Object.values(ProductMaterials)),
          images: [faker.image.fashion(300, 300)],
        } as Product),
    );
  };

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
  images: Array<string>;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

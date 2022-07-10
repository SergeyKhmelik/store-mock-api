import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { DEFAULT_SCHEMA_OPTIONS } from '../utils/database.utils';

export type CategoryDocument = Category & Document;

@Schema(DEFAULT_SCHEMA_OPTIONS)
export class Category {
  @Prop()
  id: string;

  @Prop({ isRequired: true, minlength: 2, unique: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  image: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);

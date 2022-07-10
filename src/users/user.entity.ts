import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { DEFAULT_SCHEMA_OPTIONS } from '../utils/database.utils';

export type UserDocument = User & Document;

@Schema(DEFAULT_SCHEMA_OPTIONS)
export class User {
  @Prop()
  id: string;

  @Prop({ isRequired: true, minlength: 2, unique: true })
  username: string;

  @Prop({ isRequired: true, minlength: 2 })
  firstName: string;

  @Prop({ isRequired: true, minlength: 2 })
  lastName: string;

  @Prop({ select: false })
  password: string;

  @Prop()
  avatar: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

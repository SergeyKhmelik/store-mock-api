import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { DEFAULT_SCHEMA_OPTIONS } from '../utils/database.utils';

export type UserDocument = User & Document;

@Schema(DEFAULT_SCHEMA_OPTIONS)
export class User {
  @Prop()
  id: string;

  @Prop()
  username: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({ select: false })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

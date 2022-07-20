import { SchemaOptions } from '@nestjs/mongoose/dist/decorators/schema.decorator';

export const DEFAULT_SCHEMA_OPTIONS: SchemaOptions = {
  timestamps: true,
  toJSON: {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
    },
  },
};

import { SchemaOptions } from '@nestjs/mongoose/dist/decorators/schema.decorator';

export const DEFAULT_SCHEMA_OPTIONS: SchemaOptions = {
  toJSON: {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => {
      delete ret._id;
    },
  },
};

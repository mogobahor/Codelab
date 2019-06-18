import { Schema } from 'mongoose';

class BaseSchema extends Schema {
  constructor(args) {
    super();

    this.add(args);

    this.virtual('id').get(function(this: any) {
      return this._id.toHexString();
    });

    this.set('toObject', {
      virtuals: true,
    });

    this.set('toJSON', {
      virtuals: true,
    });
  }
}

export default BaseSchema;

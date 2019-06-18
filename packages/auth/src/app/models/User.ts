import { Document, Model, model } from 'mongoose';
import BaseSchema from 'src/app/models/BaseSchema';
import Err from 'src/utils/Err';

const bcrypt = require('bcrypt');

/**
 * There are many Document instances
 */
export interface IUserDocument extends Document {
  username: string;
  password: string;
}

/**
 * Instance methods
 */
export interface IUser extends IUserDocument {
  verifyPassword(password: string): Promise<boolean>;
}

/**
 * Only 1 Model of type IUser
 */
export interface IUserModel extends Model<IUser> {
  hashPassword(password: string): boolean;
}

export type Maybe<T> = T | null;

const UserSchema = new BaseSchema({
  username: {
    type: String,
    unique: true,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
});

/**
 * Checks whether the candidate password matches the current queried user's.
 *
 * @param candidatePassword: string
 * @return Promise<boolean>
 */
UserSchema.methods.verifyPassword = async function(
  candidatePassword,
): Promise<boolean> {
  const valid = await bcrypt.compare(candidatePassword, this.password);

  if (!valid) {
    throw new Err({
      name: 'IncorrectPasswordException',
      message: 'The password you entered is not valid.',
    });
  }

  return valid;
};

/**
 * Pre-save hook
 */
UserSchema.pre('save', function(this: IUser, next) {
  if (!this.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      this.password = hash;
      next();
    });
  });
});

/**
 * Post-save hook & error handling
 */
UserSchema.post('save', (error, doc, next) => {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(
      new Err({
        type: error.name,
        code: error.code,
        message: error.errmsg,
      }),
    );
  } else {
    next(error);
  }
});

/**
 * Pre-find hook
 */
// UserSchema.pre('findOne', function(this: any, next) {
//   console.log('pre find');
//   console.log(this.getQuery());
//   const { password } = this.getQuery();
//
//   // Use setQuery() to change plain text to encrypted pw to match
//   bcrypt.genSalt(10, (err, salt) => {
//     if (err) {
//       return next(err);
//     }
//     bcrypt.hash(password, salt, (err, hash) => {
//       if (err) {
//         return next(err);
//       }
//       this.setQuery({ password: hash });
//       console.log(this.getQuery());
//       next();
//     });
//   });
// });

const User: IUserModel = model<IUser, IUserModel>('User', UserSchema);

export default User;

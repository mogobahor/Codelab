import mongoose from 'mongoose';
import mongoConfig from '../globalConfig.json';

export const connectMongoose = async (): Promise<boolean> => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(
      mongoConfig.mongoUri,
      { useNewUrlParser: true },
      err => {
        if (err) {
          console.log(
            'Mongoose test connection error in Integration test',
            err,
          );
          throw err;
        }
      },
    );
  } else if ((mongoose.connection.readyState = 1)) {
    return true;
  }
  return false;
};

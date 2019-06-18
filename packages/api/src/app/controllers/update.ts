const Router = require('koa-router');
import * as mongoose from 'mongoose';
import { IUpdateInput } from 'src/data/InputData';
import { updateData } from 'src/data/update-data';

const route = new Router({
  prefix: '/update',
});

route.post('/', async (ctx, next) => {
  const updatedValue = await update(updateData as IUpdateInput);
  ctx.body = updatedValue;
});

export const update = async (obj: IUpdateInput) => {
  const mongooseModel = mongoose.model(obj.model);
  const updatedValue = await mongooseModel.findByIdAndUpdate(
    { _id: obj.where.id },
    obj.data,
    {
      new: true,
    },
  );
  return updatedValue;
};

export default route;

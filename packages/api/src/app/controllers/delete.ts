const Router = require('koa-router');
import models from 'src/app/models/Models';
import { deleteData } from 'src/data/delete-data';
import { DeleteInput } from 'src/data/InputData';

const route = new Router({
  prefix: '/delete',
});

// For testing purpose; getting the restaurant datas
route.get('/get', async (ctx, next) => {
  const data = await models['Restaurant'].find({});
  ctx.body = data;
});

route.post('/', async (ctx, next) => {
  const deletedData = await deleteById(deleteData as DeleteInput);
  ctx.body = deletedData;
});

export const deleteById = async (obj: DeleteInput) => {
  const mongooseModel = models[obj.model];
  const data = await mongooseModel.deleteOne({ _id: obj.where.id });
  return data;
};

export default route;

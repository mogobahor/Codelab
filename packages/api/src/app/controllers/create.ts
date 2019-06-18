const Router = require('koa-router');
import { map } from 'p-iteration';
import {
  CreateRes,
  DocType,
  insertModel,
  ModelType,
} from 'src/app/controllers/api';
import { createData } from 'src/data/create-data';

const route = new Router({
  prefix: '/create',
});

route.post('/', ctx => {
  create(createData);

  ctx.body = 'Loaded!';
});

export const create = (
  models: ModelType[] | DocType[],
): Promise<CreateRes[]> => {
  return map(models, async model => {
    return await insertModel(model);
  });
};

export default route;

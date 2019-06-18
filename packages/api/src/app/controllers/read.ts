const Router = require('koa-router');
import models from 'src/app/models/Models';
import {
  ASC,
  DESC,
  EQUALS,
  GREATERTHAN,
  LESSTHAN,
} from 'src/config/staticData';
import { IReadInput } from 'src/data/InputData';

const fs = require('fs');

const route = new Router({
  prefix: '/read',
});

route.post('/', async (ctx, next) => {
  const obj = JSON.parse(fs.readFileSync('data/read/readAll.json', 'utf8'));
  ctx.body = await readLogic(obj);
});

route.post('/readFilter', async (ctx, next) => {
  const obj = JSON.parse(
    fs.readFileSync('data/read/read-data-filter.json', 'utf8'),
  );
  return (ctx.body = await readLogic(obj));
});

route.post('/selectFields', async (ctx, next) => {
  const obj = JSON.parse(
    fs.readFileSync('data/read/read-column-filter.json', 'utf8'),
  );

  ctx.body = await readLogic(obj);
});

export async function readLogic(data: IReadInput): Promise<any[]> {
  return new Promise(async (resolve, reject) => {
    if (!resolve) {
      return null;
    }

    let mongooseModel;

    if (data.where && data.where[0]) {
      mongooseModel = models[data.model];

      if (data.where && Object.keys(data.where).length > 0) {
        let result;

        if (data.where[0].operator === GREATERTHAN) {
          result = await mongooseModel.find({
            [data.where[0].field]: { $gte: data.where[0].minValue },
          });
        } else if (data.where[0].operator === LESSTHAN) {
          result = await mongooseModel.find({
            [data.where[0].field]: { $lte: data.where[0].maxValue },
          });
        } else if (data.where[0].operator === EQUALS) {
          result = await mongooseModel.find({
            [data.where[0].field]: data.where[0].value,
          });
        }

        if (result) resolve(result);
      }
      resolve([]);
    } else if (data.fields && data.fields.length > 0) {
      mongooseModel = models[data.model];
      const query = mongooseModel.find({});
      query.select(data.fields.join(' '));
      const result = await query.exec();
      result ? resolve(result) : resolve([]);
    } else if (data.sort && data.sort.length > 0) {
      mongooseModel = models[data.model];
      const query = mongooseModel.find({});
      let sortOrder: 'asc' | 'desc' = 'asc';
      if (data.sort[0].operator === ASC) {
        sortOrder = 'asc';
      } else if (data.sort[0].operator === DESC) {
        sortOrder = 'desc';
      }

      query.sort({ [data.sort[0].field]: sortOrder });
      const result = await query.exec();
      result ? resolve(result) : resolve([]);
    }
    mongooseModel = models[data.model];
    const allData = await mongooseModel.find({});
    return resolve(allData);
  });
}

export default route;

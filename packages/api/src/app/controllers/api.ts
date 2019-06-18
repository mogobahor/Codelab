const Router = require('koa-router');
import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
import { forEach, map } from 'p-iteration';
import { create } from 'src/app/controllers/create';
import { deleteById } from 'src/app/controllers/delete';
import { readLogic } from 'src/app/controllers/read';
import { update } from 'src/app/controllers/update';
import models from 'src/app/models/Models';

export type DocType<T = any> = {
  [key: string]: T;
};

export type ModelType<T = any> = {
  model: string;
  docs: T extends ModelType<infer R> ? ModelType<R>[] : DocType[];
};

export type CreateRes = {
  ids: ObjectId[];
  data: mongoose.Document[];
};

const router = new Router({
  prefix: '/',
});

const toArrayWithKey = (obj: DocType) =>
  Object.keys(obj).map(key => ({ key, value: obj[key] }));

const insertDoc = async (
  doc: ModelType | DocType,
  model: string,
): Promise<mongoose.Document> => {
  const dataObject: {
    [key: string]: mongoose.Document | mongoose.Document[];
  } = {};
  const docFields = toArrayWithKey(doc);
  await forEach(docFields, async field => {
    const { key, value } = field;
    if (value.model && models[value.model]) {
      // This is a model type
      const insertedModel = await insertModel(value);
      dataObject[key] = insertedModel.data;
    } else {
      // This is a primitive value
      dataObject[key] = value;
    }
  });
  const savedDoc = await models[model].create(dataObject);
  return savedDoc;
};

export const insertModel = async (
  modelData: ModelType | DocType,
): Promise<CreateRes> => {
  const { model, docs } = modelData;
  const insertedDocs = await map(docs, doc => insertDoc(doc, model));
  const ids = insertedDocs.map(doc => doc._id);
  return {
    ids,
    data: insertedDocs,
  };
};

export const clearModel = async (data: ModelType) => {
  const { model } = data;
  const Model = models[model];
  await Model.deleteMany({});
};

router.post('/', (ctx, next) => {
  ctx.body = 'Server Started!';
});

export const apiRequest = async (ctx: any & { request: any }): Promise<any> => {
  switch (ctx.request.body.action) {
    case 'create':
      return await create(ctx.request.body.data);
    case 'update':
      return await update(ctx.request.body);
    case 'read':
      return await readLogic(ctx.request.body);
    case 'delete':
      return await deleteById(ctx.request.body);
    default:
      return null;
  }
};

router.post('api', apiRequest);

export default router;

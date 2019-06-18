import mongoose from 'mongoose';
import { forEach } from 'p-iteration';
import * as api from 'src/app/controllers/api';
import { create } from 'src/app/controllers/create';
import { readLogic } from 'src/app/controllers/read';
import { update } from 'src/app/controllers/update';
import { schema } from 'src/app/models/Models';
import { createData } from 'src/data/create-data';
import { IReadInput } from 'src/data/InputData';
import { readAll } from 'src/data/read/readAll';
import { connectMongoose } from 'test/helpers/mongo-test-helpers';

beforeAll(async () => {
  await connectMongoose();
});

afterAll(() => {
  mongoose.disconnect();
});

/**
 * @function update
 * @param {model: string, where: {id: string}, data: {menu: string}}
 */
test('Integration test -> update.test.js', async done => {
  await forEach(schema, async (model: any) => {
    await api.clearModel(model);
  });

  const insertOutput = await create(createData);
  const readData: any = await readLogic(readAll as IReadInput);
  const mockedCtx: any = {
    request: {
      body: {
        action: 'update',
        model: 'Restaurant',
        where: { id: readData[0]._id },
        data: { name: 'McDonalds Updated' },
      },
    },
  };
  const updatedValue = await api.apiRequest(mockedCtx);
  expect(updatedValue._id.toString()).toBe(readData[0]._id.toString());
  expect(updatedValue.name).toEqual(mockedCtx.request.body.data.name);
  done();
});

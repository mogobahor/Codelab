import mongoose from 'mongoose';
import { forEach } from 'p-iteration';
import * as api from 'src/app/controllers/api';
import { create } from 'src/app/controllers/create';
import { readLogic } from 'src/app/controllers/read';
import { schema } from 'src/app/models/Models';
import { createData } from 'src/data/create-data';
import { DeleteInput } from 'src/data/InputData';
import { connectMongoose } from 'test/helpers/mongo-test-helpers';

beforeAll(async () => {
  await connectMongoose();
});

afterAll(() => {
  mongoose.disconnect();
});

/**
 * Before, delete any model data, we need to check model data exist or not;
 * If model data exist, it will delete existed data;
 * If model data not exist, it will put data into model and delete it but deleteById function
 * @param {id: string, model: string}
 */
test('Integration test -> delete.test.js', async done => {
  let readData: any = await readLogic({ action: 'read', model: 'Restaurant' });
  let deleteResponse;
  let mockedCtx: any;
  // Clear data
  await forEach(schema, async (model: any) => {
    await api.clearModel(model);
  });
  const insertOutput = await create(createData);
  readData = await readLogic({ action: 'read', model: 'Restaurant' });
  mockedCtx = {
    request: {
      body: <DeleteInput>{
        action: 'delete',
        where: { id: readData[0].id },
        model: 'Restaurant',
      },
    },
  };
  deleteResponse = await api.apiRequest(mockedCtx);
  const newReadData: any[] = await readLogic({
    action: 'read',
    model: 'Restaurant',
  });
  const readDataFilterEquals: any = {
    action: 'read',
    model: 'Restaurant',
    where: [
      {
        field: '_id',
        operator: 'EQUALS',
        value: readData[0].id,
      },
    ],
  };
  const deletedRead = await readLogic(readDataFilterEquals);
  expect(newReadData).toHaveLength(readData.length - 1);
  expect(deletedRead).toHaveLength(0);
  expect(deleteResponse.ok).toBe(1);
  done();
});

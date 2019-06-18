import mongoose from 'mongoose';
import { forEach } from 'p-iteration';
import * as api from 'src/app/controllers/api';
import { create } from 'src/app/controllers/create';
import { schema } from 'src/app/models/Models';
import { createData } from 'src/data/create-data';
import { ICreateInput } from 'src/data/InputData';
import { connectMongoose } from 'test/helpers/mongo-test-helpers';

const sinon = require('sinon');

beforeAll(async () => {
  await connectMongoose();
});

afterAll(() => {
  mongoose.disconnect();
});

test('Integration test -> create.js  ', async done => {
  // Clear data
  // TODO: provide types schema
  // schema.forEach(model => clearModel(model));
  await forEach(schema, async (model: any) => {
    await api.clearModel(model);
  });
  // Create
  // console.log(createData)
  const requestBody: ICreateInput = {
    action: 'create',
    data: createData,
  };
  const mockedCtx: any = {
    request: {
      body: requestBody,
    },
  };

  const createdData = (await api.apiRequest(mockedCtx))!;

  const Restaurant = mongoose.model('Restaurant');
  const restaurants = await Restaurant.find({});
  const firstModelDocs = createData[0].docs;

  const data = createdData[0]!.data;

  expect(createdData[0]!.ids).toHaveLength(3);
  expect(createdData[0].data).toHaveLength(3);
  firstModelDocs.forEach(modelValue => {
    const foundVal = data.find((val: any) => val.name === modelValue.name);
    expect(foundVal.rating).toEqual(Number.parseInt(modelValue.rating, 8));
    expect(foundVal.name).toEqual(modelValue.name);
    expect(foundVal.menus).toHaveLength(2);
  });
  expect(restaurants.length).toBe(3);
  done();
});

/**
 * We want to test that insertModel() is called with appropriate arguments.
 *
 * insertModel() takes an argument
 */
test('it should call insertModel() on create()', async () => {
  const insertStub = sinon.stub(api, 'insertModel');

  await create(createData);

  insertStub.restore();

  // createData.forEach(data => {
  // });

  sinon.assert.calledWith(insertStub, createData[0]);
});

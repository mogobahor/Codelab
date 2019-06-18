import { get } from 'lodash';
import * as mongoose from 'mongoose';
import config from 'src/config/config';

const { Schema } = mongoose;

const fs = require('fs');

export type ModelField = {
  name: string;
  type: string;
  relationship?: string;
};

export type JsonModel = {
  model: string;
  fields: ModelField[];
};

/**
 * This will eventually load dynamically from a GraphQL database
 */
export const schema: JsonModel[] = JSON.parse(
  fs.readFileSync(`${config.dataDir}/schema.json`, 'utf8'),
);

// TODO
// - add other relationships
// - move to another file (a "constants" file for example)
const RELATIONSHIP = {
  HAS_MANY: 'hasMany',
};

// Dynamically assign models here
const models: { [key: string]: mongoose.Model<mongoose.Document, {}> } = {};

/**
 * Generates key value pairs of { field: type }
 */
const buildSchema = (schema: mongoose.SchemaDefinition, field: ModelField) => {
  const fieldRef = field.name;

  // Modify schema if relationship
  let fieldType: mongoose.SchemaTypeOpts<any> = {
    type: field.type,
  };

  const relationship = get(field, 'relationship');
  if (relationship) {
    switch (relationship) {
      case RELATIONSHIP.HAS_MANY: {
        fieldType = {
          type: [Schema.Types.ObjectId],
          ref: field.type,
        };
        break;
      }
      default: {
        fieldType = {
          type: Schema.Types.ObjectId,
          ref: field.type,
        };
      }
    }
  }

  schema[fieldRef] = fieldType;

  return schema;
};

export const buildModel = (model: JsonModel) => {
  // console.log('Model:', model)

  // Dynamically add schema here
  const schema = model.fields.reduce(
    (schema: mongoose.SchemaDefinition, field) => buildSchema(schema, field),
    {},
  );

  // Create the model
  const modelRef = model.model;

  // console.log('schema:', modelRef);
  // console.log(JSON.stringify(schema));

  models[modelRef] = mongoose.model(modelRef, new Schema(schema));
};

schema.forEach(model => buildModel(model));

export default models;

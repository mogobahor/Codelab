import { fileLoader, mergeTypes } from 'merge-graphql-schemas';
import * as path from 'path';

const typesArray = fileLoader(path.join(__dirname, '*stitch.schema.graphql'));

export const stitchSchema = mergeTypes(typesArray);

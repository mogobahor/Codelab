import { mergeSchemas } from 'graphql-tools';
import graphcmsSchema from 'src/graphql/schema/graphcms';
import prismaSchema from 'src/graphql/schema/prisma';
import { stitchSchema } from 'src/graphql/schema/stitch';
import { stitchResolvers } from 'src/graphql/schema/stitch/stitch.resolvers';

/**
 * Combine all schema to be used in delegateToSchema
 */
export const mergedSchemas = async () =>
  mergeSchemas({
    schemas: [await graphcmsSchema(), prismaSchema],
  });

const schema = async () =>
  mergeSchemas({
    /**
     * We load all schema requried for stitchResolvers, which is entire app
     */
    schemas: [await graphcmsSchema(), prismaSchema, stitchSchema],
    /**
     * Stitch App & User together
     */
    resolvers: stitchResolvers,
  });

export default schema;

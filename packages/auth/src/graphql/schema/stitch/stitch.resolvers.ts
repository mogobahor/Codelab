import { mergedSchemas } from 'src/graphql/schema/index';

export const stitchResolvers = {
  User: {
    apps: {
      // fragment: `... on User { id }`,
      async resolve(user, args, context, info) {
        return info.mergeInfo.delegateToSchema({
          context,
          info,
          args: {
            where: {
              userId: user.id,
            },
          },
          schema: await mergedSchemas(),
          operation: 'query',
          fieldName: 'apps',
        });
      },
    },
  },
};

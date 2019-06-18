import gql from 'graphql-tag';
import { Screen } from '@codelab/layout';

export const GET_CONFIG = gql`
  query getConfig {
    config @client {
      screenSize
    }
  }
`;

type ConfigInput = {
  screenSize: string;
};

export const SET_CONFIG = gql`
  mutation setConfig($config: ConfigInput) {
    setConfig(config: $config) @client
  }
`;

type ConfigState = {
  defaults: {
    config: {
      __typename: string;
      screenSize: Screen.Size;
    };
  };
  resolvers: any;
};

const configState: ConfigState = {
  defaults: {
    config: {
      __typename: 'Config',
      screenSize: Screen.Size.SM,
    },
  },
  resolvers: {
    Query: {
      // authenticated: (_, variables, { cache }) => {
      //   const {
      //     user: { authenticated },
      //   } = cache.readQuery({ query: GET_USER });
      //   return authenticated;
      // },
    },
    Mutation: {
      setConfig: (_, { config }, { cache }) => {
        const data = {
          config: {
            __typename: 'Config',
            ...config,
          },
        };
        cache.writeData({ data });
        return cache.readQuery({ query: GET_CONFIG });
      },
    },
  },
};

export default configState;

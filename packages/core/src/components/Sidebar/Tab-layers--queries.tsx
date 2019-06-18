import gql from 'graphql-tag';
import { default as appQuery } from 'src/graphql/api.graphql';

export const APP_QUERY = gql`
  ${appQuery}
`;

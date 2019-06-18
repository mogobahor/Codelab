import gql from 'graphql-tag';
import { default as userAppQuery } from './User-app--query.graphql';

export const USER_APPS_QUERY = gql`
  ${userAppQuery}
`;

export const USER_CODELAB_QUERY = gql`
  query user {
    user(where: { username: "Codelab" }) {
      id
      username
      apps {
        name
      }
    }
  }
`;

export const USER_ME_QUERY = gql`
  query me {
    me {
      id
      username
    }
  }
`;

// export const USER_APPS_QUERY = gql`
//   query userAppQuery($where: UsrWhereUniqueInput!) {
//     usr(where: $where) {
//       id
//       username
//       apps {
//         id
//         name
//       }
//     }
//   }
// `;

export const currentUser = {
  id: 'cjtqup9oj1xu90848xdfvhplh',
  username: 'Codelab',
};

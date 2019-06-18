import gql from 'graphql-tag';

export const APPS_QUERY = gql`
  query getApps($where: AppWhereUniqueInput!) {
    app(where: $where) {
      id
      name
      pages {
        id
        title
        containers {
          id
          grids {
            id
          }
        }
      }
    }
  }
`;
export const APP_CREATE_MUTATION = gql`
  mutation($data: AppCreateInput!) {
    createApp(data: $data) {
      id
      name
    }
  }
`;
export const APP_UPDATE_MUTATION = gql`
  mutation($data: AppUpdateInput!, $where: AppWhereUniqueInput!) {
    updateApp(data: $data, where: $where) {
      id
      name
    }
  }
`;
export const APP_DELETE_MUTATION = gql`
  mutation($where: AppWhereUniqueInput!) {
    deleteApp(where: $where) {
      id
    }
  }
`;

import gql from 'graphql-tag';

export const ELEMENTS_GET_QUERIES = gql`
  query elements {
    elements {
      id
      grid {
        id
      }
      index
      variantInstances {
        id
      }
      component {
        id
        type
        templates {
          id
        }
      }
    }
  }
`;

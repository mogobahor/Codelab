// tslint:disable
// this is an auto generated file. This will be overwritten

export const getModel = `query GetModel($id: ID!) {
  getModel(id: $id) {
    id
    name
    fields {
      items {
        id
        name
      }
      nextToken
    }
  }
}
`;
export const listModels = `query ListModels(
  $filter: ModelModelFilterInput
  $limit: Int
  $nextToken: String
) {
  listModels(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      fields {
        nextToken
      }
    }
    nextToken
  }
}
`;
export const getField = `query GetField($id: ID!) {
  getField(id: $id) {
    id
    name
    model {
      id
      name
      fields {
        nextToken
      }
    }
  }
}
`;
export const listFields = `query ListFields(
  $filter: ModelFieldFilterInput
  $limit: Int
  $nextToken: String
) {
  listFields(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      model {
        id
        name
      }
    }
    nextToken
  }
}
`;

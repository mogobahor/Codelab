// tslint:disable
// this is an auto generated file. This will be overwritten

export const createModel = `mutation CreateModel($input: CreateModelInput!) {
  createModel(input: $input) {
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
export const updateModel = `mutation UpdateModel($input: UpdateModelInput!) {
  updateModel(input: $input) {
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
export const deleteModel = `mutation DeleteModel($input: DeleteModelInput!) {
  deleteModel(input: $input) {
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
export const createField = `mutation CreateField($input: CreateFieldInput!) {
  createField(input: $input) {
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
export const updateField = `mutation UpdateField($input: UpdateFieldInput!) {
  updateField(input: $input) {
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
export const deleteField = `mutation DeleteField($input: DeleteFieldInput!) {
  deleteField(input: $input) {
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

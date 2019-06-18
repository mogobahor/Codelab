// tslint:disable
// this is an auto generated file. This will be overwritten

export const onCreateModel = `subscription OnCreateModel {
  onCreateModel {
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
export const onUpdateModel = `subscription OnUpdateModel {
  onUpdateModel {
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
export const onDeleteModel = `subscription OnDeleteModel {
  onDeleteModel {
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
export const onCreateField = `subscription OnCreateField {
  onCreateField {
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
export const onUpdateField = `subscription OnUpdateField {
  onUpdateField {
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
export const onDeleteField = `subscription OnDeleteField {
  onDeleteField {
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

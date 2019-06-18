/* tslint:disable */
//  This file was automatically generated and should not be edited.

export type CreateModelInput = {
  id?: string | null;
  name: string;
};

export type UpdateModelInput = {
  id: string;
  name?: string | null;
};

export type DeleteModelInput = {
  id?: string | null;
};

export type CreateFieldInput = {
  id?: string | null;
  name: string;
  fieldModelId?: string | null;
};

export type UpdateFieldInput = {
  id: string;
  name?: string | null;
  fieldModelId?: string | null;
};

export type DeleteFieldInput = {
  id?: string | null;
};

export type ModelModelFilterInput = {
  id?: ModelIDFilterInput | null;
  name?: ModelStringFilterInput | null;
  and?: Array<ModelModelFilterInput | null> | null;
  or?: Array<ModelModelFilterInput | null> | null;
  not?: ModelModelFilterInput | null;
};

export type ModelIDFilterInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
};

export type ModelStringFilterInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
};

export type ModelFieldFilterInput = {
  id?: ModelIDFilterInput | null;
  name?: ModelStringFilterInput | null;
  and?: Array<ModelFieldFilterInput | null> | null;
  or?: Array<ModelFieldFilterInput | null> | null;
  not?: ModelFieldFilterInput | null;
};

export type CreateModelMutationVariables = {
  input: CreateModelInput;
};

export type CreateModelMutation = {
  createModel: {
    __typename: 'Model';
    id: string;
    name: string;
    fields: {
      __typename: 'ModelFieldConnection';
      items: Array<{
        __typename: 'Field';
        id: string;
        name: string;
      } | null> | null;
      nextToken: string | null;
    } | null;
  } | null;
};

export type UpdateModelMutationVariables = {
  input: UpdateModelInput;
};

export type UpdateModelMutation = {
  updateModel: {
    __typename: 'Model';
    id: string;
    name: string;
    fields: {
      __typename: 'ModelFieldConnection';
      items: Array<{
        __typename: 'Field';
        id: string;
        name: string;
      } | null> | null;
      nextToken: string | null;
    } | null;
  } | null;
};

export type DeleteModelMutationVariables = {
  input: DeleteModelInput;
};

export type DeleteModelMutation = {
  deleteModel: {
    __typename: 'Model';
    id: string;
    name: string;
    fields: {
      __typename: 'ModelFieldConnection';
      items: Array<{
        __typename: 'Field';
        id: string;
        name: string;
      } | null> | null;
      nextToken: string | null;
    } | null;
  } | null;
};

export type CreateFieldMutationVariables = {
  input: CreateFieldInput;
};

export type CreateFieldMutation = {
  createField: {
    __typename: 'Field';
    id: string;
    name: string;
    model: {
      __typename: 'Model';
      id: string;
      name: string;
      fields: {
        __typename: 'ModelFieldConnection';
        nextToken: string | null;
      } | null;
    } | null;
  } | null;
};

export type UpdateFieldMutationVariables = {
  input: UpdateFieldInput;
};

export type UpdateFieldMutation = {
  updateField: {
    __typename: 'Field';
    id: string;
    name: string;
    model: {
      __typename: 'Model';
      id: string;
      name: string;
      fields: {
        __typename: 'ModelFieldConnection';
        nextToken: string | null;
      } | null;
    } | null;
  } | null;
};

export type DeleteFieldMutationVariables = {
  input: DeleteFieldInput;
};

export type DeleteFieldMutation = {
  deleteField: {
    __typename: 'Field';
    id: string;
    name: string;
    model: {
      __typename: 'Model';
      id: string;
      name: string;
      fields: {
        __typename: 'ModelFieldConnection';
        nextToken: string | null;
      } | null;
    } | null;
  } | null;
};

export type GetModelQueryVariables = {
  id: string;
};

export type GetModelQuery = {
  getModel: {
    __typename: 'Model';
    id: string;
    name: string;
    fields: {
      __typename: 'ModelFieldConnection';
      items: Array<{
        __typename: 'Field';
        id: string;
        name: string;
      } | null> | null;
      nextToken: string | null;
    } | null;
  } | null;
};

export type ListModelsQueryVariables = {
  filter?: ModelModelFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListModelsQuery = {
  listModels: {
    __typename: 'ModelModelConnection';
    items: Array<{
      __typename: 'Model';
      id: string;
      name: string;
      fields: {
        __typename: 'ModelFieldConnection';
        nextToken: string | null;
      } | null;
    } | null> | null;
    nextToken: string | null;
  } | null;
};

export type GetFieldQueryVariables = {
  id: string;
};

export type GetFieldQuery = {
  getField: {
    __typename: 'Field';
    id: string;
    name: string;
    model: {
      __typename: 'Model';
      id: string;
      name: string;
      fields: {
        __typename: 'ModelFieldConnection';
        nextToken: string | null;
      } | null;
    } | null;
  } | null;
};

export type ListFieldsQueryVariables = {
  filter?: ModelFieldFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListFieldsQuery = {
  listFields: {
    __typename: 'ModelFieldConnection';
    items: Array<{
      __typename: 'Field';
      id: string;
      name: string;
      model: {
        __typename: 'Model';
        id: string;
        name: string;
      } | null;
    } | null> | null;
    nextToken: string | null;
  } | null;
};

export type OnCreateModelSubscription = {
  onCreateModel: {
    __typename: 'Model';
    id: string;
    name: string;
    fields: {
      __typename: 'ModelFieldConnection';
      items: Array<{
        __typename: 'Field';
        id: string;
        name: string;
      } | null> | null;
      nextToken: string | null;
    } | null;
  } | null;
};

export type OnUpdateModelSubscription = {
  onUpdateModel: {
    __typename: 'Model';
    id: string;
    name: string;
    fields: {
      __typename: 'ModelFieldConnection';
      items: Array<{
        __typename: 'Field';
        id: string;
        name: string;
      } | null> | null;
      nextToken: string | null;
    } | null;
  } | null;
};

export type OnDeleteModelSubscription = {
  onDeleteModel: {
    __typename: 'Model';
    id: string;
    name: string;
    fields: {
      __typename: 'ModelFieldConnection';
      items: Array<{
        __typename: 'Field';
        id: string;
        name: string;
      } | null> | null;
      nextToken: string | null;
    } | null;
  } | null;
};

export type OnCreateFieldSubscription = {
  onCreateField: {
    __typename: 'Field';
    id: string;
    name: string;
    model: {
      __typename: 'Model';
      id: string;
      name: string;
      fields: {
        __typename: 'ModelFieldConnection';
        nextToken: string | null;
      } | null;
    } | null;
  } | null;
};

export type OnUpdateFieldSubscription = {
  onUpdateField: {
    __typename: 'Field';
    id: string;
    name: string;
    model: {
      __typename: 'Model';
      id: string;
      name: string;
      fields: {
        __typename: 'ModelFieldConnection';
        nextToken: string | null;
      } | null;
    } | null;
  } | null;
};

export type OnDeleteFieldSubscription = {
  onDeleteField: {
    __typename: 'Field';
    id: string;
    name: string;
    model: {
      __typename: 'Model';
      id: string;
      name: string;
      fields: {
        __typename: 'ModelFieldConnection';
        nextToken: string | null;
      } | null;
    } | null;
  } | null;
};

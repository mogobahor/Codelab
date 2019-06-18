import gql from 'graphql-tag';

export const ADD_WORKFLOW = gql`
  mutation createWorkflow($workflowCreateInput: WorkflowCreateInput!) {
    createWorkflow(data: $workflowCreateInput) {
      id
    }
  }
`;

export const DELETE_WORKFLOW = gql`
  mutation deleteWorkflow(
    $workflowWhereUniqueInput: WorkflowWhereUniqueInput!
  ) {
    deleteWorkflow(where: $workflowWhereUniqueInput) {
      id
    }
  }
`;

export const GET_WORKFLOWS = gql`
  query getFlowList {
    workflows(orderBy: createdAt_DESC) {
      id
      event {
        id
        name
      }
      action {
        id
        action
      }
    }
  }
`;

export const GET_ACTIONS = gql`
  query {
    actions {
      id
      action
    }
  }
`;

export const ADD_ACTION = gql`
  mutation createAction($actionCreateInput: ActionCreateInput!) {
    createAction(data: $actionCreateInput) {
      id
    }
  }
`;

export const DELETE_ACTION = gql`
  mutation deleteAction($actionWhereUniqueInput: ActionWhereUniqueInput!) {
    deleteAction(where: $actionWhereUniqueInput) {
      id
    }
  }
`;

export const UPDATE_ACTION = gql`
  mutation updateAction(
    $actionUpdateInput: ActionUpdateInput!
    $actionWhereUniqueInput: ActionWhereUniqueInput!
  ) {
    updateAction(data: $actionUpdateInput, where: $actionWhereUniqueInput) {
      id
    }
  }
`;

export const GET_EVENTS = gql`
  query {
    events {
      id
      name
    }
  }
`;

export const ADD_EVENT = gql`
  mutation createEvent($eventCreateInput: EventCreateInput!) {
    createEvent(data: $eventCreateInput) {
      id
    }
  }
`;

export const DELETE_EVENT = gql`
  mutation deleteEvent($eventWhereUniqueInput: EventWhereUniqueInput!) {
    deleteEvent(where: $eventWhereUniqueInput) {
      id
    }
  }
`;

export const UPDATE_EVENT = gql`
  mutation updateEvent(
    $eventUpdateInput: EventUpdateInput!
    $eventWhereUniqueInput: EventWhereUniqueInput!
  ) {
    updateEvent(data: $eventUpdateInput, where: $eventWhereUniqueInput) {
      id
    }
  }
`;

export const GET_WORKFLOWTEMPLATES = gql`
  query getWorkflowTemplate {
    events {
      id
      name
    }
    actions {
      id
      action
    }
  }
`;

export enum INPUT_TYPES {
  Text = 'text',
  Password = 'password',
  Textarea = 'textarea',
  Select = 'select',
  Checkbox = 'checkbox',
  Radio = 'radio',
  Datetime = 'datetime',
  Slider = 'slider',
  Cascader = 'cascader',
  RadioButton = 'radioButton',
  Color = 'color',
  Number = 'number',
}

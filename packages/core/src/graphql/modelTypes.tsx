export enum ComponentTypes {
  Grid = 'GRID',
  Container = 'CONTAINER',
  Element = 'ELEMENT',
  Workflow = 'WORKFLOW',
  Component = 'COMPONENT',
  Action = 'ACTION',
  Event = 'EVENT',
  WorkflowTemplate = 'WORKFLOWTEMPLATE',
}

export enum SystemTypes {
  User = 'USER',
  App = 'APP',
}

export const Models = {
  ...ComponentTypes,
  ...SystemTypes,
};

export enum ComponentListTypes {
  Grids = 'GRIDS',
  Containers = 'CONTAINERS',
  Elements = 'ELEMENTS',
  Components = 'COMPONENTS',
  Variants = 'VARIANTS',
  CSSClasses = 'CSSCLASSES',
  CSSTemplates = 'CSSTEMPLATES',
}

export const ModelList = {
  ...ComponentListTypes,
};

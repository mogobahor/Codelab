import { Scalars } from 'src/graphql/__generated__/graphql-api';
import { ComponentTypes } from 'src/graphql/modelTypes';

export type Model<T> = {
  // Destructure type T
  [P in keyof T]: T[P]
  // Add common DB fields
} & { id: Scalars['ID'] };

export type IComponent = {
  type: ComponentTypes;
  templates: Model<IVariantTemplate>[];
};

export interface IVariantTemplate {
  name: string;
  variants: Model<IVariant>[];
}

export interface IVariant {
  name: string;
  classes: Model<IClass>[];
}

export interface IVariantInstance {
  variant: Model<IVariant>;
  template: Model<IVariantTemplate>;
}

export interface IClass {
  name: string;
  css: Model<ICSSInstance>[];
}

export interface ICSSInstance {
  property: Model<ICSSProperty>;
  option: Model<ICSSValue>;
}

export interface ICSSTemplate {
  name: string;
  property: Model<ICSSProperty>;
  options: Model<ICSSValue>[];
}

export interface ICSSProperty {
  name: string;
  property: string;
}

export interface ICSSValue {
  value: string;
  types: any; // CSS enum
}

import { BEM } from '@codelab/utils';
import {
  MutationOptions,
  OperationVariables,
  WithApolloClient,
} from 'react-apollo';
import { IInputLayout } from 'src/components/Form/Form--layout';
import { INPUT_TYPES } from 'src/components/Input/Input';

/**
 * FormContainer is Form + Apollo
 */
export type ApolloFormProps = WithApolloClient<FormProps>;

export enum FormLayout {
  Inline = 'INLINE',
  Horizontal = 'HORIZONTAL',
  Vertical = 'VERTICAL',
}

export type OnSubmitValue = {
  [key: string]: string;
};
export type OnSubmitType = (values: OnSubmitValue, props: any) => void;

export type FormProps = {
  customFields?: IFormFields[]; // Allow additional fields to be inserted
  layout?: FormLayout;
  mutation?: any; // Apollo mutation
  client?: any; // Apollo client
  onSubmit: OnSubmitType; // Promise callback on submit
  onComplete?: (any) => void; // Callback on complete
} & InnerFormProps &
  MutationOptions<any, OperationVariables>;

export type InnerFormProps = {
  fields: IFormFields[];
  className?: string;
  mode?: string;
  layout?: FormLayout;
  submitOnChange?: boolean;
  submitButton?: any;
  children?: (any) => JSX.Element; // Insert extra content inside form
  bem?: BEM; // Used for CSS class
};

export interface IFormFields {
  name: string;
  value?: string | number | boolean;
  inputType: INPUT_TYPES;
  placeholder?: string;
  label?: string;
  optionGutter?: number;

  // attr
  index?: number;
  id?: string;
  attributes?: any;
  defaultChecked?: boolean;
  defaultValue?: any;
  disabled?: boolean;
  style?: string;
  sync?: string; // Allow conditional dropdown

  // Field array options
  // fieldArrayName?: string;
  fieldArray?: {
    name: string;
    buttonText?: string; // Button text of button to add
  };
  // checkbox
  max?: number;
  min?: number;
  step?: number;
  options?: { label: string; value: string }[];
  // [propName: string]: any;
  layout?: IInputLayout;
  validation?: any[];

  // Multiple select
  mode?: string;
}

export interface IFormWrapperProps {
  onSubmit: () => void;
  className?: string;
  children?: React.ReactNode;
  layout?: FormLayout;
}

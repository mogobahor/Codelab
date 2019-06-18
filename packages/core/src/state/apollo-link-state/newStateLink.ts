import { merge } from 'lodash';
import configState from 'src/state/apollo-link-state/config/configState';
import dynamicFormState from 'src/state/apollo-link-state/dynamic-form/dynamicFormState';
import exampleState from 'src/state/apollo-link-state/example/exampleState';
import layoutState from 'src/state/apollo-link-state/layout/layoutState';
import modalState from 'src/state/apollo-link-state/modal/modalState';
import userState from './user/userState';

const newStateLink = merge(
  userState,
  modalState,
  dynamicFormState,
  exampleState,
  configState,
  layoutState,
);

export default newStateLink;

import gql from 'graphql-tag';
import { find } from 'lodash';

export const GET_MODALS = gql`
  query modalsQuery {
    modals @client {
      id
      visible
    }
  }
`;

export const GET_MODAL = gql`
  query modal($id: String!) {
    modal(id: $id) @client {
      id
      visible
    }
  }
`;

export const TOGGLE_MODAL = gql`
  mutation toggleModal($id: String) {
    toggleModal(id: $id) @client
  }
`;

const MODAL_TYPENAME = 'Modal';

export enum ModalIDs {
  Testing = 'TESTING',
  AddNode = 'ADD_NODE',
  LoginRegister = 'LOGIN_REGISTER',
  Register = 'REGISTER',
  Login = 'LOGIN',
  VerifyAccount = 'VERIFY_ACCOUNT',
  ForgotPassword = 'FORGOT_PASSWORD',
  ConfirmForgotPassword = 'CONFIRM_FORGOT_PASSWORD',
  AppUpdate = 'APP_UPDATE',
  AppCreate = 'APP_CREATE',
}

/**
 * (Vien) Write Jest unit test for `GET_MODALS`, `GET_MODAL` & `TOGGLE_MODAL`
 * mutation.
 *
 * https://github.com/apollographql/apollo-link-state/issues/278
 *
 * `GET_MODALS`: Assert count to equal entire list
 *
 * `GET_MODAL`: Assert count to equal 1 & check name matches
 *
 * `TOGGLE_MODAL`: Assert `visible` property has been toggled
 *
 */
const modalState = {
  defaults: {
    modals: [
      {
        __typename: MODAL_TYPENAME,
        id: ModalIDs.Register,
        visible: false,
      },
      {
        __typename: MODAL_TYPENAME,
        id: ModalIDs.Login,
        visible: false,
      },
    ],
  },
  resolvers: {
    Query: {
      modal: (_, variables: { id: string }, { cache }) => {
        console.log('get modal');
        const { modals } = cache.readQuery({ query: GET_MODALS });
        return find(modals, modal => modal.id === variables.id);
      },
    },
    Mutation: {
      toggleModal: (_, variables: { id: string }, { cache }) => {
        const id = `Modal:${variables.id}`;
        const fragment = gql`
          fragment visibleModal on Modal {
            visible
          }
        `;
        const modal = cache.readFragment({ fragment, id });
        const data = { ...modal, visible: !modal.visible };
        cache.writeData({ id, data });
        return null;
      },
    },
  },
};

export default modalState;

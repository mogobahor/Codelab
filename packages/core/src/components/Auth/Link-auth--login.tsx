import { Form, INPUT_TYPES } from '@codelab/form';
import gql from 'graphql-tag';
import React from 'react';
import { Modal } from 'src/components/Modal/Modal';
import { User } from 'src/components/User/User';
import { useModal } from 'src/context/ModalContext';
import { ModalIDs } from 'src/state/apollo-link-state/modal/modalState';

const AUTH_LOGIN_MUTATION = gql`
  mutation login($data: UserCreateInput!) {
    login(data: $data) {
      token
      user {
        username
      }
    }
  }
`;

export const AUTH_LOGOUT_MUTATION = gql`
  mutation logout {
    logout
  }
`;

const loginFields = [
  {
    inputType: INPUT_TYPES.Text,
    name: 'username',
    placeholder: 'Username:',
    validation: [{ required: true, msg: 'Required!!' }],
  },
  {
    inputType: INPUT_TYPES.Password,
    name: 'password',
    placeholder: 'Password:',
    validation: [{ required: true, msg: 'Required!!' }],
  },
];

const LinkAuthLogin = () => {
  const modalID = ModalIDs.Login;
  const { toggleModal, closeModal } = useModal(modalID);
  return (
    <>
      <a className="Link-auth--login" onClick={toggleModal()}>
        Login
      </a>
      <Modal id={modalID}>
        <h2> Login </h2>
        <Form
          fields={loginFields}
          mutation={AUTH_LOGIN_MUTATION}
          onSubmit={(data, { mutate, client }) => {
            return User.login(data, {
              mutate,
              client,
            });
          }}
          onComplete={closeModal()}
        />
      </Modal>
    </>
  );
};

export default LinkAuthLogin;

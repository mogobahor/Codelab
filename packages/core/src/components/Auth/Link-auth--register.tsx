import { Form, INPUT_TYPES } from '@codelab/form';
import { Auth, Component, Module } from '@codelab/system';
import { bemName } from '@codelab/utils';
import gql from 'graphql-tag';
import React from 'react';
import { default as AuthRegisterMutation } from 'src/components/Auth/Auth-register--mutation.graphql';
import { Modal } from 'src/components/Modal/Modal';
import { User } from 'src/components/User/User';
import { useModal } from 'src/context/ModalContext';
import { ModalIDs } from 'src/state/apollo-link-state/modal/modalState';

const registerFields = [
  {
    inputType: INPUT_TYPES.Text,
    name: 'username',
    placeholder: 'Email:',
    validation: [{ required: true, msg: 'Required!!' }],
  },
  {
    inputType: INPUT_TYPES.Password,
    name: 'password',
    placeholder: 'Password:',
    validation: [{ required: true, msg: 'Required!!' }],
  },
];

const AUTH_REGISTER_MUTATION = gql`
  ${AuthRegisterMutation}
`;

const LinkAuthRegister = () => {
  const modalID = ModalIDs.Register;
  const { toggleModal, closeModal } = useModal(modalID);
  return (
    <>
      <a
        className={bemName({
          b: Component.Link,
          e: Module.Auth,
          m: Auth.Register,
        })}
        onClick={toggleModal()}
      >
        Register
      </a>
      <Modal id={modalID} module={Module.Auth}>
        <h2> Register </h2>
        <Form
          fields={registerFields}
          mutation={AUTH_REGISTER_MUTATION}
          onSubmit={(data, { mutate, client }) =>
            User.register(data, {
              mutate,
              client,
            })
          }
          onComplete={closeModal()}
          bem={{ e: Module.Auth, m: Auth.Register }}
        />
      </Modal>
    </>
  );
};

export default LinkAuthRegister;

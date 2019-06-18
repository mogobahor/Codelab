import { Form } from '@codelab/form';
import React from 'react';
import { APP_CREATE_MUTATION } from 'src/components/App/App--queries';
import { Modal } from 'src/components/Modal/Modal';
import {
  currentUser,
  USER_APPS_QUERY,
} from 'src/components/User/User--queries';
import { useModal } from 'src/context/ModalContext';
import { ModalIDs } from 'src/state/apollo-link-state/modal/modalState';

const AppModalCreate = () => {
  const modalID = ModalIDs.AppCreate;
  const { toggleModal } = useModal(modalID);
  const fields = [
    {
      name: 'name',
      inputType: 'text',
      value: 'My App',
      type: 'string',
      validation: [
        { required: true, msg: 'Required!!' },
        { min: 2, msg: 'Too Short!' },
        { max: 30, msg: 'Too Long!' },
      ],
    },
  ];
  const submitButton = {
    text: 'Create App',
  };

  return (
    <Modal id={modalID}>
      <Form
        mutation={APP_CREATE_MUTATION}
        fields={fields}
        submitButton={submitButton}
        onComplete={toggleModal()}
        onSubmit={(values, { mutate }) => {
          const variables: any = {
            data: {
              usr: {
                connect: {
                  id: currentUser.id,
                },
              },
              ...values,
            },
          };
          const refetchVariables = {
            where: {
              username: 'Codelab',
            },
          };
          return new Promise(resolve => {
            mutate({
              variables,
              refetchQueries: [
                {
                  query: USER_APPS_QUERY,
                  variables: refetchVariables,
                },
              ],
            });
            resolve();
          });
        }}
      />
    </Modal>
  );
};

export default AppModalCreate;

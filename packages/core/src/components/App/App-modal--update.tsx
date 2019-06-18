import { Form } from '@codelab/form';
import React from 'react';
import { APP_UPDATE_MUTATION } from 'src/components/App/App--queries';
import { Modal } from 'src/components/Modal/Modal';
import {
  currentUser,
  USER_APPS_QUERY,
} from 'src/components/User/User--queries';
import { useModal } from 'src/context/ModalContext';
import { ModalIDs } from 'src/state/apollo-link-state/modal/modalState';

const AppModalUpdate = () => {
  const modalID = ModalIDs.AppUpdate;
  const { toggleModal, data } = useModal(modalID);
  const { app } = data;

  const fields = [
    {
      name: 'name',
      inputType: 'text',
      value: app ? app.name : '',
      type: 'string',
      validation: [
        { required: true, msg: 'Required!!' },
        { min: 2, msg: 'Too Short!' },
        { max: 30, msg: 'Too Long!' },
      ],
    },
  ];
  const submitButton = {
    text: 'Update App',
  };
  return (
    <Modal id={modalID}>
      <Form
        mutation={APP_UPDATE_MUTATION}
        fields={fields}
        submitButton={submitButton}
        onComplete={toggleModal()}
        onSubmit={(values, { mutate }) => {
          const variables: any = {
            where: {
              id: app.id,
            },
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

export default AppModalUpdate;

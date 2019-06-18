import { Form } from '@codelab/form';
import React from 'react';
import { Modal } from 'src/components/Modal/Modal';
import { APP_READ_QUERY, currentUser } from 'src/components/User/User--queries';
import { ModalIDs } from 'src/state/apollo-link-state/modal/modalState';

const fieldAppName = {
  name: 'name',
  inputType: 'text',
  value: 'My App',
  type: 'string',
  validation: [
    { required: true, msg: 'Required!!' },
    { min: 2, msg: 'Too Short!' },
    { max: 30, msg: 'Too Long!' },
  ],
};

const updateCacheAfterCreateApp = (cache, createApp) => {
  const { apps } = cache.readQuery({
    query: APP_READ_QUERY,
    variables: {
      where: {
        usr: currentUser,
      },
    },
  });
  cache.writeQuery({
    query: APP_READ_QUERY,
    variables: {
      where: {
        usr: currentUser,
      },
    },
    data: { apps: apps.concat([createApp]) },
  });
};

const ModalCreateUpdateUsrApp = () => {
  let submitButton = {};
  if (modal === ModalIDs.UpdateUserApp) {
    submitButton = { text: 'Update app' };
    fieldAppName.value = editingApp.name;
  } else {
    submitButton = { text: 'CreateApp' };
    fieldAppName.value = 'My App';
  }

  return (
    <Modal id={ModalIDs.CreateUserApp}>
      <Form
        mutation={mutation}
        fields={[fieldAppName]}
        submitButton={submitButton}
        onSubmit={(values, { mutate }) => {
          return new Promise((resolve, reject) => {
            const variables: any = {
              data: {
                status: 'DRAFT',
                usr: {
                  connect: {
                    id: currentUser.id,
                  },
                },
                ...values,
              },
            };
            if (modal === ModalIDs.UpdateUserApp) {
              variables.where = {
                id: editingApp.id,
              };
            }
            mutate({
              variables,
              refetchQueries: ['getApps'],
            });
            resolve();
          });
        }}
        onComplete={() => Promise.resolve(toggleModal(null, null))}
      />
    </Modal>
  );
};

export default ModalCreateUpdateUsrApp;

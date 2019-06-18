import { Button, Menu } from 'antd';
import React from 'react';
import { Mutation } from 'react-apollo';
import { APP_DELETE_MUTATION } from 'src/components/App/App--queries';
import { USER_APPS_QUERY } from 'src/components/User/User--queries';
import { useModal } from 'src/context/ModalContext';
import { ModalIDs } from 'src/state/apollo-link-state/modal/modalState';

const AppDropdownActions = ({ app }) => {
  const { toggleModal } = useModal(ModalIDs.AppUpdate);

  return (
    <Menu>
      <Menu.Item>
        <Button
          block={true}
          icon="edit"
          onClick={toggleModal({ data: { app } })}
        >
          Edit
        </Button>
      </Menu.Item>
      <Menu.Item>
        <Mutation mutation={APP_DELETE_MUTATION}>
          {deleteApp => (
            <Button
              block={true}
              icon="close"
              onClick={() => {
                const refetchVariables = {
                  where: {
                    username: 'Codelab',
                  },
                };
                deleteApp({
                  variables: {
                    where: {
                      id: app.id,
                    },
                  },
                  refetchQueries: [
                    {
                      query: USER_APPS_QUERY,
                      variables: refetchVariables,
                    },
                  ],
                });
              }}
            >
              Delete
            </Button>
          )}
        </Mutation>
      </Menu.Item>
    </Menu>
  );
};

export default AppDropdownActions;

import { Form } from '@codelab/form';
import { Col, Row } from 'antd';
import { get } from 'lodash';
import React from 'react';
import { adopt } from 'react-adopt';
import { UserServiceConsumer } from 'src/context/consumer';
import { ModalIDs } from 'src/state/apollo-link-state/modal/modalState';
import ModalSubscriber from 'src/state/ModalSubscriber';
import ModalContainer from 'src/utils/ModalContainer';
import openNotification from 'src/utils/notification-helper';

const Composed = adopt<any, {}>({
  userService: ({ render }) => (
    <UserServiceConsumer>{render}</UserServiceConsumer>
  ),
  modalSub: ({ render }) => <ModalSubscriber>{render}</ModalSubscriber>,
  ConfirmForgotPswForm: ({ render, modalSub, userService }) => {
    const { state } = modalSub;
    const username = get(state, 'data.username', '');
    const forgotPswFields = [
      {
        inputType: 'text',
        name: 'username',
        disabled: username !== '',
        value: username,
        validation: [{ required: true, msg: 'Required!!' }],
      },
      {
        inputType: 'text',
        name: 'code',
        placeholder: 'code:',
        validation: [{ required: true, msg: 'Required!!' }],
      },
      {
        inputType: 'password',
        name: 'new_password',
        placeholder: 'new password:',
        validation: [
          { min: 6, msg: 'Too Short!' },
          { max: 15, msg: 'Too Long!' },
          { required: true, msg: 'Required!!' },
          {
            matches: /(?=.*[A-Z])/,
            msg: 'Has at least 1 uppercase',
          },
          {
            matches: /(?=.*[a-z])/,
            msg: 'Has at least 1 lowercase letter',
          },
          {
            matches: /(?=.*[\d])/,
            msg: 'Requires numbers',
          },
        ],
      },
    ];
    return (
      <Form
        mode="renderProps"
        fields={forgotPswFields}
        enableReinitialize={true}
        onComplete={() => Promise.resolve(console.log('onComplete'))}
        onSubmit={values =>
          new Promise((resolve, reject) => {
            userService.authService
              .forgotPasswordSubmit(values)
              .then(() => {
                resolve();
                openNotification('success', 'changed password successfully');
                modalSub.toggleModal();
              })
              .catch(err => {
                resolve();
                openNotification('error', err.message);
              });
          })
        }
      >
        {render}
      </Form>
    );
  },
});

const ModalConfirmForgotPassword = () => {
  return (
    <ModalContainer
      id={ModalIDs.ConfirmForgotPassword}
      visibleIds={[ModalIDs.ConfirmForgotPassword]}
      title="Register"
      className="Modal-auth--register"
      footer={[]}
    >
      <Composed>
        {({ ConfirmForgotPswForm, userService, modalSub }) => {
          // const { state } = modalSub;
          // const username = get(state, 'data.username');
          const { formController } = ConfirmForgotPswForm;
          return (
            <ConfirmForgotPswForm.FormFields
              Fields={ConfirmForgotPswForm.Fields}
              className={formController.className}
            >
              <Row type="flex" justify="space-between">
                <Col span={12} push={6}>
                  <ConfirmForgotPswForm.FormButton
                    block={true}
                    isSubmitting={formController.isSubmitting}
                    handleSubmit={formController.handleSubmit}
                  >
                    Change
                  </ConfirmForgotPswForm.FormButton>
                </Col>
              </Row>
            </ConfirmForgotPswForm.FormFields>
          );
        }}
      </Composed>
    </ModalContainer>
  );
};
export default ModalConfirmForgotPassword;

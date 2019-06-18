import { Form } from '@codelab/form';
import { Tabs as AntdTabs } from 'antd';
import { get } from 'lodash';
import React from 'react';
import { adopt } from 'react-adopt';
import Tabs from 'src/components/Tabs/Tabs';
import { UserServiceConsumer } from 'src/context/consumer';
import { ModalIDs } from 'src/state/apollo-link-state/modal/modalState';
import ModalSubscriber, { IModalContainer } from 'src/state/ModalSubscriber';
import ModalContainer from 'src/utils/ModalContainer';
import openNotification from 'src/utils/notification-helper';

const TabPane = AntdTabs.TabPane;

const registerFields = [
  {
    inputType: 'text',
    name: 'username',
    placeholder: 'Username:',
    valueFrom: 'email',
    validation: [{ required: true, msg: 'Required!!' }],
  },
  {
    inputType: 'text',
    name: 'email',
    placeholder: 'Email:',
    validation: [{ required: true, msg: 'Required!!' }],
  },
  {
    inputType: 'password',
    name: 'password',
    placeholder: 'Password:',
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

const loginFields = [
  {
    inputType: 'text',
    name: 'username',
    placeholder: 'Username:',
    valueFrom: 'email',
    validation: [{ required: true, msg: 'Required!!' }],
  },
  {
    inputType: 'password',
    name: 'password',
    placeholder: 'Password:',
    validation: [{ required: true, msg: 'Required!!' }],
  },
];

interface IRenderProps {
  userService: any;
  RegisterForm: {
    FormFields: any;
    FormButton: any;
  };
  LoginForm: {
    FormFields: any;
    FormButton: any;
  };
  modalSub: IModalContainer;
}

const Composed = adopt<IRenderProps, {}>({
  userService: ({ render }) => (
    <UserServiceConsumer>{render}</UserServiceConsumer>
  ),
  modalSub: ({ render }) => <ModalSubscriber>{render}</ModalSubscriber>,
});

const RegisterComposed = adopt<IRenderProps, any>({
  Composed: <Composed />,
  RegisterForm: ({ Composed, render }) => {
    const { userService, modalSub } = Composed;
    return (
      <Form
        mode="renderProps"
        fields={registerFields}
        onSubmit={values =>
          new Promise((resolve, reject) => {
            userService.authService.signUp(
              values,
              data => {
                resolve();
                openNotification(
                  'success',
                  'Register Success',
                  'we have send a verification code to your email',
                );
                modalSub.toggleModal(ModalIDs.VerifyAccount, data.user);
              },
              err => {
                resolve();
                openNotification('error', 'Register Failed', err.message);
              },
            );
          })
        }
        className="Form-auth--register"
        onComplete={() => Promise.resolve(console.log('onComplete'))}
      >
        {render}
      </Form>
    );
  },
});

const LoginComposed = adopt<IRenderProps, any>({
  Composed: <Composed />,
  LoginForm: ({ Composed, render }) => {
    const { userService, modalSub } = Composed;
    return (
      <>
        <Form
          mode="renderProps"
          fields={loginFields}
          onSubmit={values =>
            new Promise((resolve, reject) => {
              userService.authService.signIn(
                values,
                user => {
                  resolve();
                  openNotification('success', 'Login Success');
                  modalSub.toggleModal();
                },
                err => {
                  resolve();
                  if (err.code === 'UserNotConfirmedException') {
                    openNotification('error', 'Login Failed', err.message);
                    modalSub.toggleModal(ModalIDs.VerifyAccount, {
                      username: values.username,
                    });
                    return;
                  }
                  openNotification('error', 'Login Failed', err.message);
                },
              );
            })
          }
          className="Form-auth--login"
          onComplete={() => Promise.resolve(console.log('onComplete'))}
        >
          {render}
        </Form>
      </>
    );
  },
});

const ModalAuthRegister = () => (
  <Composed>
    {({ modalSub, userService }) => {
      const {
        state: { modal },
        toggleModal,
      } = modalSub;

      return (
        <ModalContainer
          id={ModalIDs.Register}
          visibleIds={[ModalIDs.Register, ModalIDs.Login]}
          title="Register"
          className="Modal-auth--register"
          footer={[]}
        >
          <Tabs
            defaultActiveKey={ModalIDs.Register}
            activeKey={modal}
            onTabClick={modal => {
              toggleModal(modal);
            }}
          >
            <TabPane tab="Sign Up" key={ModalIDs.Register}>
              <RegisterComposed>
                {({ RegisterForm }) => {
                  const { formController } = RegisterForm;
                  return (
                    <RegisterForm.FormFields
                      Fields={RegisterForm.Fields}
                      className={formController.className}
                    >
                      <RegisterForm.FormButton
                        isSubmitting={formController.isSubmitting}
                        handleSubmit={formController.handleSubmit}
                        block={true}
                        marginbottom="1.5rem"
                      >
                        Sign Up
                      </RegisterForm.FormButton>
                      <p>
                        Lost verification code? <a>Resend Code</a>
                      </p>
                      <p>
                        Have an account? <a>Sign in</a>
                      </p>
                    </RegisterForm.FormFields>
                  );
                }}
              </RegisterComposed>
            </TabPane>
            <TabPane tab="Log In" key={ModalIDs.Login}>
              <LoginComposed>
                {({ LoginForm }) => {
                  const { formController } = LoginForm;
                  const username = get(
                    LoginForm,
                    'formController.values.username',
                  );
                  return (
                    <LoginForm.FormFields
                      Fields={LoginForm.Fields}
                      class={formController.className}
                    >
                      <LoginForm.FormButton
                        block={true}
                        marginbottom="1.5rem"
                        isSubmitting={formController.isSubmitting}
                        handleSubmit={formController.handleSubmit}
                      >
                        Login
                      </LoginForm.FormButton>
                      <p>
                        <a
                          onClick={() =>
                            modalSub.toggleModal(ModalIDs.ForgotPassword)
                          }
                        >
                          Forgot your password?
                        </a>
                      </p>
                    </LoginForm.FormFields>
                  );
                }}
              </LoginComposed>
            </TabPane>
          </Tabs>
        </ModalContainer>
      );
    }}
  </Composed>
);

export default ModalAuthRegister;

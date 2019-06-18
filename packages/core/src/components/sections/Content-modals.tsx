import React from 'react';
import ModalConfirmForgotPassword from 'src/components/Auth/Modal-auth--confirmForgotPassword';
import ModalForgotPassword from 'src/components/Auth/Modal-auth--forgotPassword';
import ModalAuthRegister from 'src/components/Auth/Modal-auth--loginRegister';
import ModalAccountVerification from 'src/components/Auth/Modal-auth--verifyAccount';

const ContentModals = () => (
  <>
    <ModalAuthRegister />
    <ModalAccountVerification />
    <ModalConfirmForgotPassword />
    <ModalForgotPassword />
  </>
);

export default ContentModals;

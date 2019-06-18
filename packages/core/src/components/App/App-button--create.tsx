import { Button } from 'antd';
import React from 'react';
import { useModal } from 'src/context/ModalContext';
import { ModalIDs } from 'src/state/apollo-link-state/modal/modalState';

const AppButtonCreate = () => {
  const { toggleModal } = useModal(ModalIDs.AppCreate);

  return (
    <Button type="primary" onClick={toggleModal()}>
      Create App
    </Button>
  );
};

export default AppButtonCreate;

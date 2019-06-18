import React from 'react';
import withPageProps from 'src/hoc/withPageProps';
import { ModalIDs } from 'src/state/apollo-link-state/modal/modalState';
import { Modal } from 'src/components/Modal/Modal';
import { Button } from 'antd';
import { useModal } from 'src/context/ModalContext';

const modalID = ModalIDs.UpdateUserApp;
const modalID2 = ModalIDs.AddNode;

const ModalToggleOne = () => {
  const { toggleModal } = useModal(modalID);
  return <Button onClick={toggleModal}>Modal 1</Button>;
};

const ModalToggleTwo = () => {
  const { toggleModal } = useModal(modalID2);
  return <Button onClick={toggleModal}>Modal 2</Button>;
};

const ModalOne = () => {
  return (
    <Modal id={modalID}>
      <h1>Modal 1 is working!</h1>
    </Modal>
  );
};

const ModalTwo = () => {
  return (
    <Modal id={modalID2}>
      <h1>Modal 2 is working!</h1>
    </Modal>
  );
};

const TestModal = () => {
  const modalContent = 'Working!';
  const modalID = ModalIDs.Testing;

  const { toggleModal } = useModal(modalID);
  return (
    <>
      <Button onClick={toggleModal}>Toggle</Button>
      <Modal id={modalID}>
        <h1>{modalContent}</h1>
      </Modal>
    </>
  );
};

const ModalPage = () => {
  return (
    <section>
      <ModalToggleOne />
      <ModalToggleTwo />
      <ModalOne />
      <ModalTwo />
      <TestModal />
    </section>
  );
};

export default withPageProps({ hasSidebar: false })(ModalPage);

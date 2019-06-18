import { Button } from 'antd';
import { mount } from 'enzyme';
import React from 'react';
import { Modal } from 'src/components/Modal/Modal';
import { ModalProvider, useModal } from 'src/context/ModalContext';
import { ModalIDs } from 'src/state/apollo-link-state/modal/modalState';

describe('Modal', () => {
  const TestModal = () => {
    const modalID = ModalIDs.Testing;
    const { toggleModal } = useModal(modalID);
    return (
      <>
        <Button onClick={toggleModal()}>Toggle</Button>
        <Modal id={modalID}>
          <h1>Working!</h1>
        </Modal>
      </>
    );
  };

  const modalWrapper = mount(
    <ModalProvider>
      <TestModal />
    </ModalProvider>,
  );

  it('is not visible by default', () => {
    expect(modalWrapper.find('h1')).toHaveLength(0);
  });

  it('is visible after toggle', () => {
    modalWrapper.find(Button).simulate('click');
    const updatedModalWrapper = modalWrapper.update();
    expect(updatedModalWrapper.find('h1')).toHaveLength(1);
  });
});

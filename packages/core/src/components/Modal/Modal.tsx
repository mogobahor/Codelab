import { Component, Module } from '@codelab/system';
import { bemName } from '@codelab/utils';
import { Button, Modal as AntModal } from 'antd';
import { Map } from 'immutable';
import { includes } from 'lodash';
import React, { ComponentType, useState } from 'react';
import { useModal } from 'src/context/ModalContext';
import { ModalIDs } from 'src/state/apollo-link-state/modal/modalState';
import styled from 'styled-components';

type ModalProps = {
  noFooter?: boolean;
  noHeader?: boolean;
};

const DefaultModal = styled(AntModal)<ModalProps>`
  .ant-modal-header {
    display: ${props => (props.noHeader ? 'none' : '')};
  }
  .ant-modal-footer {
    display: ${props => (props.noFooter ? 'none' : '')};
  }
`;

interface IModalContainerProps {
  id: ModalIDs;
  children: any;
  title?: string;
  className?: string;
  OkButton?: ComponentType;
  footer?: any;
  width?: string | number; // Default: 520px
  visibleIds?: ModalIDs[];
  module?: Module;
}

const Modal = ({
  id,
  children,
  title = 'Title',
  className = '',
  OkButton,
  footer,
  width,
  visibleIds, // Allow multiple ids for visible state
  module,
}: IModalContainerProps) => {
  const { isVisible, closeModal } = useModal(id);

  const modalClassName = `${className} ${bemName({
    b: Component.Modal,
    e: module,
    m: id,
  })}`.trim();
  const noFooter = !footer || footer.length === 0;
  const footerComp = footer
    ? footer
    : [
        <Button key="back" onClick={closeModal()}>
          Return
        </Button>,
        OkButton ? (
          <OkButton key="submit" />
        ) : (
          <Button key="submit" type="primary" onClick={closeModal()}>
            Default Submit
          </Button>
        ),
      ];

  return (
    <DefaultModal
      noFooter={noFooter}
      noHeader={true}
      title={title}
      width={width ? width : 520}
      visible={isVisible}
      // visible={
      // visibleIds
      //   ? visibleIds.includes(modalSub.state.modal)
      //   : modalSub.state.modal === id
      // }
      onOk={closeModal()}
      onCancel={closeModal()}
      className={modalClassName}
      footer={footerComp}
      wrapProps={{
        onMouseDown: e => {
          const targetClass = e.target.getAttribute('class');
          if (targetClass && includes(targetClass, 'ant-modal-wrap')) {
            closeModal()(e);
          }
        },
      }}
    >
      {children}
    </DefaultModal>
  );
};

type ModalData = {
  visibility: boolean;
  data: any;
};

const useModalState = (modalIDs: ModalIDs[]) => {
  // Init map of modal ids and their data
  const modalMap: Map<string, ModalData> = Map(
    modalIDs.map(id => [id, { visibility: false, data: {} }]),
  );
  // Create state
  const [modalData, setModalData] = useState(modalMap);

  const toggleModal = (modalID: ModalIDs, data: any = {}) => {
    const newModalData = modalData.set(modalID, {
      data,
      visibility: !modalData.get(modalID).visibility,
    });
    setModalData(newModalData);
  };

  const closeModal = (modalID: ModalIDs, data: any = {}) => {
    const newModalData = modalData.set(modalID, {
      data,
      visibility: false,
    });
    setModalData(newModalData);
  };

  const openModal = (modalID: ModalIDs, data: any = {}) => {
    const newModalData = modalData.set(modalID, {
      data,
      visibility: true,
    });
    setModalData(newModalData);
  };

  const isVisible = (modalID: ModalIDs): boolean => {
    return modalData.get(modalID)!.visibility;
  };

  const data = (modalID: ModalIDs) => {
    return modalData.get(modalID)!.data;
  };

  return {
    data,
    isVisible,
    toggleModal,
    openModal,
    closeModal,
  };
};

export { Modal, useModalState };

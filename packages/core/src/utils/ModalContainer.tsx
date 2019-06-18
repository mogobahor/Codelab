import React, { ComponentType } from 'react';
import { ModalIDs } from 'src/state/apollo-link-state/modal/modalState';
import { Modal as AntModal } from 'antd';
import { adopt } from 'react-adopt';
import styled from 'styled-components';
import { Button } from '@codelab/form';
import ModalSubscriber, { IModalContainer } from 'src/state/ModalSubscriber';

type ModalProps = {
  noFooter?: boolean;
  noHeader?: boolean;
};

const Modal = styled(AntModal)<ModalProps>`
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
}

interface IRenderProps {
  modalSub: IModalContainer;
}

interface IProps {
  id: any;
}

const Composed = adopt<IRenderProps, IProps>({
  modalSub: ({ render }) => <ModalSubscriber>{render}</ModalSubscriber>,
});

const ModalContainer = ({
  id,
  children,
  title = 'Title',
  className,
  OkButton,
  footer,
  width,
  visibleIds, // Allow multiple ids for visible state
}: IModalContainerProps) => (
  <Composed id={id}>
    {({ modalSub }) => {
      const {
        toggleModal,
        state: { modal },
      } = modalSub;
      const noFooter = !footer || footer.length === 0;
      const footerComp = footer
        ? footer
        : [
            <Button key="back" onClick={() => toggleModal()}>
              Return
            </Button>,
            OkButton ? (
              <OkButton key="submit" />
            ) : (
              <Button key="submit" type="primary" onClick={() => toggleModal()}>
                Default Submit
              </Button>
            ),
          ];

      return (
        <Modal
          noFooter={noFooter}
          noHeader={true}
          title={title}
          width={width ? width : 520}
          visible={
            visibleIds
              ? visibleIds.includes(modalSub.state.modal)
              : modalSub.state.modal === id
          }
          onOk={() => toggleModal()}
          onCancel={() => toggleModal()}
          className={className}
          footer={footerComp}
        >
          {children}
        </Modal>
      );
    }}
  </Composed>
);

export default ModalContainer;

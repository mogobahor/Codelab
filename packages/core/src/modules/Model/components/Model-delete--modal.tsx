import React, { useState } from 'react';
import { Button, Modal } from 'antd';

interface IModelDeleteModalProps {
  handleOk: () => any;
  handleCancel: () => any;
  visible: any;
}

const ModelDeleteModal = ({
  handleOk,
  handleCancel,
  visible,
}: IModelDeleteModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDelete = () => {
    setIsSubmitting(true);

    handleOk().then(() => {
      handleCancel();
    });
  };

  return (
    <Modal
      title="Delete Model"
      visible={visible}
      onCancel={handleCancel}
      width={320}
      okButtonProps={{ type: 'danger' }}
      okText="Delete"
      footer={[
        <Button key="back" onClick={handleCancel}>
          Return
        </Button>,
        <Button
          className="Button-model--confirmDelete"
          key="submit"
          type="primary"
          htmlType="submit"
          loading={isSubmitting}
          onClick={handleDelete}
        >
          {isSubmitting ? 'Loading' : 'Delete'}
        </Button>,
      ]}
    >
      Confirm Delete?
    </Modal>
  );
};

export default ModelDeleteModal;

import React from 'react';
import { Modal } from 'antd';
import { Form } from '@codelab/form';

const fields = [
  {
    inputType: 'text',
    name: 'name',
    value: '',
    placeholder: 'Model Name',
    type: 'string',
    validation: [
      { min: 2, msg: 'Too Short!' },
      { max: 20, msg: 'Too Long!' },
      { required: true, msg: 'Required!!' },
    ],
  },
];

interface ICreate {
  createModel: any;
  handleOk: any;
  handleCancel: any;
  onComplete: any;
  visible: boolean;
}

const ModelCreateModal = (props: ICreate) => (
  <Modal
    className="Modal-model--create"
    title="Add Model"
    visible={props.visible}
    onOk={props.handleOk}
    onCancel={props.handleCancel}
  >
    <Form
      fields={fields}
      onSubmit={props.createModel}
      onComplete={props.onComplete}
    />
  </Modal>
);

export default ModelCreateModal;

import { Form } from '@codelab/form';
import { Modal } from 'antd';
import { forOwn } from 'lodash';
import React from 'react';

interface IModelUpdate {
  updateModel: any;
  handleOk: any;
  handleCancel: any;
  onComplete: any;
  id?: any;
  model: any;
  visible: boolean;
}

const fields = [
  {
    inputType: 'text',
    name: 'id',
    value: null,
    attributes: { hidden: true },
  },
  {
    inputType: 'text',
    name: 'name',
    value: 'Menu',
    placeholder: 'Model Name',
    type: 'string',
    validation: [
      { min: 2, msg: 'Too Short!' },
      { max: 20, msg: 'Too Long!' },
      { required: true, msg: 'Required!!' },
    ],
  },
];

const ModelUpdateModal = ({
  updateModel,
  handleOk,
  handleCancel,
  onComplete,
  model,
  visible,
}: IModelUpdate) => {
  // Replace fields with fetched value
  fields.forEach(field => {
    forOwn(model, (val, key) => {
      if (field.name === key) {
        field.name = val;
      }
    });
  });

  return (
    <Modal
      title="Basic Modal"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form
        fields={fields}
        onSubmit={updateModel}
        onComplete={onComplete}
        className="Form-model--update"
      />
    </Modal>
  );
};

export default ModelUpdateModal;

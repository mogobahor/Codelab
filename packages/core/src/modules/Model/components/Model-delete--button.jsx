import React from 'react';
import { Button } from 'antd';

const ModelDeleteButton = ({ onDelete }) => (
  <Button type="primary" className="Button-model--delete" onClick={onDelete}>
    Delete
  </Button>
);

export default ModelDeleteButton;

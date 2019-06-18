import { Checkbox } from 'antd';
import React from 'react';

interface ICheckboxInput {
  name: string;
  value: boolean;
  style: string;
  label: string;
  onChange: any;
}

const AppCheckbox = ({
  name,
  label,
  onChange,
  value,
  style,
}: ICheckboxInput) => {
  return (
    <div className={style}>
      <Checkbox name={name} onChange={onChange} checked={value}>
        {label}
      </Checkbox>
    </div>
  );
};
export default AppCheckbox;

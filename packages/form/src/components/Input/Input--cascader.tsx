import React from 'react';
import { Cascader } from 'antd';

interface ICascaderInput {
  options: [any];
  defaultValue: any;
  style?: React.CSSProperties;
  name: string;
  setFieldValue: any;
  placeholder: string;
}

const AppCascader = ({
  options,
  defaultValue,
  style,
  name,
  setFieldValue,
  placeholder,
}: ICascaderInput) => {
  return (
    <Cascader
      defaultValue={defaultValue}
      onChange={value => {
        setFieldValue(name, value);
      }}
      style={style}
      placeholder={placeholder}
      options={options}
    />
  );
};

export default AppCascader;

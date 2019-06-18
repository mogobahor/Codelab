import { Divider, Icon, Select } from 'antd';
import React from 'react';

const { Option } = Select;

export interface ISelectOption {
  label: string;
  value: string;
}

interface ISelectInput {
  options: [ISelectOption];
  defaultValue: any;
  style?: React.CSSProperties;
  name: string;
  setFieldValue: any;
  placeholder: string;
  mode: string;
  onComplete?: any;
  isCreatable?: Boolean;
  onCreate?: any;
  value?: any;
}

const AppSelect = ({
  options,
  defaultValue,
  style,
  name,
  setFieldValue,
  placeholder,
  mode,
  onComplete,
  isCreatable,
  onCreate,
  value,
}: ISelectInput) => {
  return (
    <div
      onMouseDown={e => {
        e.preventDefault();
        return false;
      }}
    >
      <Select
        defaultValue={defaultValue}
        placeholder={placeholder}
        onChange={ev => {
          if (onComplete) {
            onComplete(ev);
          }
          setFieldValue(name, ev);
        }}
        style={style}
        mode={mode}
        dropdownRender={menu => {
          let newButton;
          if (isCreatable !== undefined && isCreatable) {
            newButton = (
              <div>
                <Divider style={{ margin: 0 }} />
                <a
                  href="javascript:;"
                  style={{ padding: 8, display: 'block' }}
                  onClick={() => {
                    if (onCreate) {
                      onCreate();
                    }
                  }}
                >
                  <Icon type="plus" /> Add Item
                </a>
              </div>
            );
          }
          return (
            <div>
              {menu}
              {newButton}
            </div>
          );
        }}
        // name={name}
        value={value ? value : undefined}
      >
        {options.map(({ label, value }, index) => {
          return (
            <Option key={`${label}_${index}`} value={value}>
              {label}
            </Option>
          );
        })}
      </Select>
    </div>
  );
};
export default AppSelect;

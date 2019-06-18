import { Col, Row } from 'antd';
import { findIndex, get, has } from 'lodash';
import React from 'react';
import { INPUT_TYPES, InputLabel } from 'src/components/Input/Input';

interface ILayout {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  // push?: number;
  // pull?: number;
}

export interface IInputLayout {
  wrapperLayout: ILayout;
  labelLayout?: ILayout;
}

const getInnerInputLayout = span => (span === 24 ? 24 : 24 - span);

const getFormLayout = layout => {
  const wrapperLayout: any = get(layout, 'wrapperLayout', {});
  const labelLayout: any = get(layout, 'labelLayout', {});
  const inputLayout = {
    xs: getInnerInputLayout(labelLayout.xs),
    sm: getInnerInputLayout(labelLayout.sm),
    md: getInnerInputLayout(labelLayout.md),
    lg: getInnerInputLayout(labelLayout.lg),
    xl: getInnerInputLayout(labelLayout.xl),
  };

  return {
    wrapperLayout,
    labelLayout,
    inputLayout,
  };
};

const isRequired = validation => findIndex(validation, { required: true }) > -1;

const initialValues = fields => {
  return (
    fields
      /**
       * Remove fieldArray fields, we will have a separate field value for that
       * later
       */
      .filter(field => !has(field, 'fieldArray.name'))
      /**
       * Reduce down to intialValues format
       */
      .reduce(
        (acc, field) =>
          Object.assign(acc, {
            [field.name]:
              field.value || field.defaultValue || field.defaultChecked,
          }),
        {},
      )
  );
};

const FieldLayout = ({
  layout,
  name,
  id,
  label,
  validation,
  children,
  className,
  inputType,
}) => {
  const { wrapperLayout, labelLayout, inputLayout } = getFormLayout(layout);

  // Hide if input type is hidden
  const visibilityStyle =
    inputType === INPUT_TYPES.Hidden ? { display: 'none' } : {};

  return (
    <div className={className} style={visibilityStyle}>
      <Col key={name} {...wrapperLayout} span={24}>
        <Row>
          {label && (
            <Col {...labelLayout} span={4}>
              <InputLabel
                label={label}
                isRequired={isRequired(validation)}
                id={id || name}
              />
            </Col>
          )}
          <Col {...inputLayout} span={label ? 20 : 24}>
            {children}
          </Col>
        </Row>
      </Col>
    </div>
  );
};

export { getFormLayout, isRequired, FieldLayout, initialValues };

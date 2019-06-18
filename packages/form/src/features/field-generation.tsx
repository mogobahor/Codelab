import React from 'react';
import { compose, withState, withHandlers } from 'recompose';
import { Field, withFormik, Formik } from 'formik';
import Form from 'src/components/Form/Form';
import _ from 'lodash';
import { action, configureActions } from '@storybook/addon-actions';
import Input from 'src/components/Input/Input';
import { Button } from 'antd';
import styled from 'styled-components';
import ThemeProvider from 'src/components/ThemeProvider';

const StyledForm = styled.form`
  padding: ${props => props.theme.padding.md};
`;
interface IField {
  name: string;
  inputType: string;
  placeholder?: string;
  [propName: string]: any;
}
const INPUT_TYPES = {
  text: 'text',
  textarea: 'textarea',
  select: 'select',
  checkbox: 'checkbox',
  radio: 'radio',
  datetime: 'datetime',
  slider: 'slider',
};

const GenerationForm = () => {
  return (
    <ThemeProvider>
      <Formik
        initialValues={{}}
        onSubmit={(values: any, {}) => {
          const newField: IField = {
            name: values.fieldName,
            inputType: values.inputType,
          };

          if (_.has(values, 'label_0')) {
            newField.options = [];
          }
          _.forIn(values, (value, key) => {
            if (_.includes(key, 'label')) {
              const id = _.split(key, '_')[1];
              newField.options.push({
                label: value,
                value: values[`value_${id}`],
              });
            }
          });
          const fieldJson = JSON.stringify(newField);
          alert(fieldJson);
        }}
        render={({ handleSubmit, setFieldValue, values }) => {
          const { inputType } = values;
          return (
            <StyledForm onSubmit={handleSubmit}>
              <Field
                inputType="text"
                name="fieldName"
                placeholder="enter field name"
                component={Input}
              />
              <Field
                inputType="text"
                name="defaultValue"
                placeholder="default value"
                component={Input}
              />
              <Field
                inputType="select"
                name="inputType"
                component={Input}
                style={{ width: 200 }}
                label="type of input"
                defaultValue="text"
                options={Object.keys(INPUT_TYPES).map(key => {
                  return {
                    label: key,
                    value: INPUT_TYPES[key],
                  };
                })}
                onChange={value => {
                  setFieldValue('inputType', value);
                }}
              />

              <RenderPrivateFields inputType={inputType} />
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </StyledForm>
          );
        }}
      />
    </ThemeProvider>
  );
};

const PrivateFields = ({
  inputType,
  options,
  increaseOptions,
  decreaseOptions,
}) => {
  switch (inputType) {
    case INPUT_TYPES.radio:
    case INPUT_TYPES.select: {
      const fields: any[] = [];
      for (let i = 0; i < options; i = i + 1) {
        fields.push(
          <div key={i}>
            <Field
              inputType="text"
              name={`label_${i}`}
              placeholder={`label-${i}`}
              component={Input}
            />
            <Field
              inputType="text"
              name={`value_${i}`}
              placeholder={`value-${i}`}
              component={Input}
            />
          </div>,
        );
      }
      return (
        <div style={{ marginBottom: '5px' }}>
          {fields}
          <Button type="primary" onClick={increaseOptions}>
            New Option
          </Button>
          <Button type="primary" onClick={decreaseOptions}>
            Delete Option
          </Button>
        </div>
      );
    }

    case INPUT_TYPES.slider: {
      return (
        <>
          <Field
            inputType="text"
            name="min"
            placeholder="min"
            component={Input}
          />
          <Field
            inputType="text"
            name="max"
            placeholder="max"
            component={Input}
          />
        </>
      );
    }
    default:
      return null;
  }
};

const withOptions = compose<any, any>(
  withState('options', 'setOptions', 1),
  withHandlers({
    increaseOptions: ({ options, setOptions }) => () => setOptions(options + 1),
    decreaseOptions: ({ options, setOptions }) => () => setOptions(options + 1),
  }),
);

const RenderPrivateFields = withOptions(PrivateFields);

export default GenerationForm;

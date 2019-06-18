import { Form, Input, INPUT_TYPES } from '@codelab/form';
import { Button, Col, Row } from 'antd';
import { Field } from 'formik';
import _ from 'lodash';
import React from 'react';
import { graphql } from 'react-apollo';
import { compose, withHandlers, withState } from 'recompose';
import { CREATE_INPUT } from 'src/state/apollo-link-state/dynamic-form/dynamicFormState';

const MutationCretateInput = graphql(CREATE_INPUT);

interface IInput {
  name: string;
  inputType: string;
  placeholder?: string;

  [propName: string]: any;
}

const fields = [
  {
    name: 'inputType',
    inputType: 'radio',
    label: 'Input Type',
    value: 'text',
    options: [
      {
        label: 'text',
        value: 'text',
        col: 8,
      },
      {
        label: 'textarea',
        value: 'textarea',
        col: 8,
      },
      {
        label: 'select',
        value: 'select',
        col: 8,
      },
      {
        label: 'checkbox',
        value: 'checkbox',
        col: 8,
      },
      {
        label: 'radio',
        value: 'radio',
        col: 8,
      },
      {
        label: 'datetime',
        value: 'datetime',
        col: 8,
      },
    ],
  },
];

const PrivateFields = ({
  inputType,
  options,
  newOption,
  deleteOption,
  values,
  setValues,
}) => {
  switch (inputType) {
    case INPUT_TYPES.Radio:
    case INPUT_TYPES.Select: {
      const fields: any[] = [];
      for (let i = 0; i < options.length; i = i + 1) {
        const option = options[i];
        fields.push(
          <div key={i}>
            <Row gutter={5}>
              <Col span={12}>
                <Field
                  inputType="text"
                  name={option.label}
                  placeholder={option.label}
                  component={Input}
                />
              </Col>
              <Col span={12}>
                <Field
                  inputType="text"
                  name={option.name}
                  placeholder={option.name}
                  component={Input}
                />
              </Col>
            </Row>
            <Row>
              <Col span={10} push={7}>
                <Button
                  type="primary"
                  onClick={() => {
                    const newValues = _.omit(values, [
                      `label-${i}`,
                      `value-${i}`,
                    ]);
                    setValues(newValues);
                    deleteOption(i);
                  }}
                  block={true}
                  icon="close"
                  style={{ marginBottom: '5px' }}
                >
                  Delete
                </Button>
              </Col>
            </Row>
          </div>,
        );
      }
      return (
        <div>
          <Row gutter={10}>
            <Col span={10}>
              <Button
                type="primary"
                onClick={newOption}
                block={true}
                icon="plus"
                style={{ marginBottom: '5px' }}
              >
                New Option
              </Button>
            </Col>
          </Row>
          {fields}
        </div>
      );
    }
    default:
      return null;
  }
};

const withOptions = compose<any, any>(
  withState('options', 'setOptions', [{ label: 'label-0', value: 'value-0' }]),
  withHandlers({
    newOption: ({ options, setOptions }) => () => {
      const length = options.length;
      const newOption = {
        label: `label-${length}`,
        value: `value-${length}`,
      };
      setOptions([...options, newOption]);
    },
    deleteOption: ({ options, setOptions }) => (index: number = 0) => {
      const newOptions = options.filter((o, oIndex) => {
        return index !== oIndex;
      });
      setOptions(newOptions);
    },
  }),
);

const RenderPrivateFields = withOptions(PrivateFields);

const TabInputs = () => {
  return (
    <Form
      mutation={CREATE_INPUT}
      mode="renderProps"
      fields={fields}
      onSubmit={(values, { mutate }) =>
        new Promise(resolve => {
          /**
           * Dynamic field to add to form
           */
          const newField: IInput = {
            name: values.name,
            inputType: values.inputType,
            placeholder: values.placeholder,
          };

          /**
           * Generate options for radio/checkbox
           */
          if (_.has(values, 'label-0')) {
            newField.options = [];
          }

          _.forIn(values, (value, key) => {
            if (_.includes(key, 'label')) {
              const id = _.split(key, '-')[1];
              newField.options.push({
                label: value,
                value: values[`value-${id}`],
              });
            }
          });

          // const fieldJson = JSON.stringify(newField);
          // alert(fieldJson);

          const variables = {
            input: newField,
          };

          mutate({ variables });
          resolve();
        })
      }
      onComplete={() => Promise.resolve(console.log('onComplete'))}
    >
      {({ FormWrapper, FormFields, Fields, FormButton, formController }) => {
        const { inputType } = formController.values;
        const {
          isSubmitting,
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          setValues,
        } = formController;
        return (
          <FormWrapper onSubmit={handleSubmit}>
            <Row gutter={10}>
              <FormFields
                Fields={Fields}
                className={formController.className}
              />
              <p>Field Settings</p>
              <Field
                inputType="text"
                name="name"
                placeholder="field name"
                onChange={handleChange}
                onBlur={handleBlur}
                component={Input}
              />
              <Field
                inputType="text"
                name="placeholder"
                placeholder="placeholder"
                component={Input}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {/* Optional field */}
              <RenderPrivateFields
                inputType={inputType}
                values={values}
                setValues={setValues}
              />
              <FormButton
                block={true}
                isSubmitting={isSubmitting}
                handleSubmit={handleSubmit}
              >
                Add Input
              </FormButton>
            </Row>
          </FormWrapper>
        );
      }}
    </Form>
  );
};

export default TabInputs;

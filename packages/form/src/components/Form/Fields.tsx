import { Button } from 'antd';
import { Field, FieldArray, FormikProps } from 'formik';
import { default as _, has } from 'lodash';
import React from 'react';
import { InnerFormProps } from 'src/components/Form/Form--interface';
import { FieldLayout } from 'src/components/Form/Form--layout';
import Input from 'src/components/Input/Input';

// const extractOptions = (options) => {

// }
/**
 * Need to inject non-fields separately, because callback is for field object
 * only.
 */
const withMappedFields = ({
  values, // Values must be passed in for sync feature. Need knowledge of other
  // fields value.
  nameOverride, // Override default name so arrayFields can work
}: {
  values: any;
  nameOverride?: string;
}) =>
  /*
   These are Field props
   */
  ({
    handleChange,
    handleBlur,
    submitOnChange,
    submitForm,
    inputType,
    id,
    name,
    value,
    placeholder,
    attributes,
    label,
    options,
    optionGutter,
    defaultChecked,
    defaultValue,
    disabled,
    min,
    max,
    layout,
    step,
    style,
    validation,
    mode,
  }) => {
    const fieldLayoutProps = {
      inputType, // If hidden need to apply hidden
      layout,
      name,
      id,
      label,
      validation,
    };

    return (
      <FieldLayout
        key={name}
        {...fieldLayoutProps}
        className="Form-field ant-form-item"
      >
        <Field
          // Basic
          id={id || name}
          inputType={inputType}
          name={nameOverride || name}
          placeholder={placeholder}
          label={label}
          // Style
          optionGutter={optionGutter}
          style={style}
          mode={mode}
          // Attributes
          attributes={attributes}
          options={options}
          defaultChecked={defaultChecked}
          disabled={disabled}
          min={min}
          max={max}
          step={step}
          // Values
          values={values}
          defaultValue={defaultValue}
          // value={value}
          // Actions
          onChange={handleChange}
          onBlur={handleBlur}
          submitOnChange={submitOnChange}
          submitForm={submitForm}
          // System
          component={Input}
        />
      </FieldLayout>
    );
  };

const Fields: React.FC<InnerFormProps & FormikProps<any>> = props => {
  const { fields, values } = props;

  /**
   * Split fields into "repeatable" and default
   */
  const defaultFields = fields.filter(field => !has(field, 'fieldArray.name'));

  const arrayFields = fields.filter(field => has(field, 'fieldArray.name'));

  /**
   * For just array fields, we want to group by fieldArrayName
   */
  const groupedArrayFields: any = _(arrayFields)
    .groupBy('fieldArray.name')
    .map((fields, fieldArrayName) => ({
      fieldArrayName,
      fields,
    }))
    .value();

  const arrayFieldsButtonText = _.reduce(
    arrayFields,
    (acc, cur) => {
      const buttonText = _.get(cur, 'fieldArray.buttonText');
      return buttonText ? buttonText : acc;
    },
    '',
  );

  /**
   * Create map fields callback from HOC by injecting Formik props.
   *
   * Allow better logical separation of prop types
   */
  return (
    <>
      {groupedArrayFields.map(({ fieldArrayName, fields }) => {
        return (
          <FieldArray
            key={fieldArrayName}
            name={fieldArrayName}
            render={arrayHelpers => (
              <div className="ant-form-item">
                {values[fieldArrayName] && values[fieldArrayName].length > 0 ? (
                  values[fieldArrayName].map((fieldValue, rowIndex) => (
                    <div key={rowIndex}>
                      {fields.map(field => {
                        const name = `${fieldArrayName}.${rowIndex}.${
                          field.name
                        }`;
                        if (has(field, 'sync') && field.values) {
                          Object.keys(field.values).forEach(syncKey => {
                            field[syncKey] =
                              field.values[syncKey][fieldValue[field.sync]] ||
                              field[syncKey];
                          });
                        }
                        return withMappedFields({
                          values,
                          nameOverride: name,
                        })(field);
                      })}
                      <Button onClick={() => arrayHelpers.remove(rowIndex)}>
                        -
                      </Button>
                      <Button
                        onClick={() => {
                          arrayHelpers.insert(rowIndex, '');
                        }}
                      >
                        +
                      </Button>
                    </div>
                  ))
                ) : (
                  <Button onClick={() => arrayHelpers.push('')}>
                    {arrayFieldsButtonText || 'Add Field'}
                  </Button>
                )}
              </div>
            )}
          />
        );
      })}
      {defaultFields.map(withMappedFields({ values }))}
    </>
  );
};

export default Fields;

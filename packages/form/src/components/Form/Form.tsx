import { withBemName } from '@codelab/utils';
import { Formik, FormikProps } from 'formik';
import React from 'react';
import { withApollo } from 'react-apollo';
import Button from 'src/components/Button/Button';
import { default as InnerFields } from 'src/components/Form/Fields';
import {
  createHandleSubmitFromMutation,
  mergeOrderedFields,
} from 'src/components/Form/Form--actions';
import {
  ApolloFormProps,
  FormProps,
  IFormFields,
  InnerFormProps,
  OnSubmitType,
} from 'src/components/Form/Form--interface';
import { initialValues } from 'src/components/Form/Form--layout';
import {
  FormButton,
  FormFields,
  FormWrapper,
} from 'src/components/Form/Form-components';
import { validationSchema } from 'src/components/Validation/validationSchema';
import './Form.scss';

export const InnerForm: React.FC<InnerFormProps & FormikProps<any>> = props => {
  const Fields = <InnerFields {...props} />;

  const {
    handleChange,
    handleBlur,
    isSubmitting,
    submitButton,
    className,
    children,
    mode,
    values,
    handleSubmit,
    setFieldTouched,
    resetForm,
    setValues,
    layout,
    bem,
  } = props;

  const bemClassName = withBemName({
    className,
    bem,
  });

  const DefaultForm = (
    <FormWrapper
      onSubmit={handleSubmit}
      className={bemClassName}
      layout={layout}
    >
      {Fields}
      <Button
        type="primary"
        htmlType="submit"
        disabled={isSubmitting}
        style={{ display: submitButton && submitButton.hide ? 'none' : '' }}
      >
        {submitButton && submitButton.text ? submitButton.text : 'Submit'}
      </Button>
    </FormWrapper>
  );

  return mode === 'renderProps'
    ? children!({
        FormWrapper,
        FormFields,
        Fields,
        FormButton,
        formController: {
          className,
          values,
          isSubmitting,
          handleSubmit,
          setFieldTouched,
          handleChange,
          handleBlur,
          resetForm,
          setValues,
        },
      })
    : DefaultForm;
};

const ApolloForm: React.FC<ApolloFormProps> = props => {
  /**
   * Merge Fields
   */
  const fieldsProps: {
    fields: IFormFields[];
    customFields?: IFormFields[];
  } = props;

  const fields = mergeOrderedFields(fieldsProps);

  /**
   *  Create props for submitting
   */
  const onSubmitProps: {
    client?;
    mutation?;
    onSubmit;
    onComplete?;
  } = props;

  const handleSubmit: OnSubmitType = createHandleSubmitFromMutation(
    onSubmitProps,
  );
  /**
   *  Form layout
   */
  const { layout } = props;

  const innerFormProps: InnerFormProps = {
    layout,
    fields,
    className: props.className,
    mode: props.mode,
    children: props.children,
    submitButton: props.submitButton,
    submitOnChange: props.submitOnChange,
  };

  return (
    <Formik
      initialValues={initialValues(fields)}
      validationSchema={validationSchema(fields)}
      enableReinitialize={true}
      onSubmit={handleSubmit}
      render={(props: FormikProps<any>) => {
        const mergedProps = { ...props, ...innerFormProps };
        return <InnerForm {...mergedProps} />;
      }}
    />
  );
};

const Form = withApollo<FormProps, ApolloFormProps>(ApolloForm);

export default Form;

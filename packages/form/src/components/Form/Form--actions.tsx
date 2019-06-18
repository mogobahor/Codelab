import { FormikActions } from 'formik';
import React from 'react';
import { MutationOptions } from 'react-apollo';
import { IFormFields, OnSubmitType } from 'src/components/Form/Form--interface';

/**
 * Takes customFields and insert into fields with correct order.
 *
 * @param customFields
 * @param fields
 */
const mergeOrderedFields = ({
  customFields = [],
  fields,
}: {
  customFields?: IFormFields[];
  fields: IFormFields[];
}) => {
  const mergedFields = Object.assign([], fields);

  for (const field of customFields) {
    if ((field as any).index && (field as any).index <= fields.length) {
      mergedFields.splice((field as any).index, 0, field);
    } else {
      mergedFields.push(field);
    }
  }

  return mergedFields;
};

const createHandleSubmitFromMutation = ({
  client,
  mutation,
  onSubmit,
  onComplete = res => {},
}: {
  client?: any;
  mutation?: any;
  onSubmit: any;
  onComplete?: any;
}): OnSubmitType => {
  let mutate: (mutationOptions: MutationOptions) => Promise<any> = () =>
    Promise.resolve();

  if (mutation) {
    mutate = mutationOptions => {
      /**
       * Take in mutation from props on Form, the rest is passed in inside
       * onSubmit()
       */
      return client!.mutate({ mutation, ...mutationOptions });
    };
  }

  /**
   * Combine props from formik submit handler & mutation
   */
  const handleSubmit = (
    values: any,
    props: FormikActions<any> & MutationOptions,
  ) => {
    props.setSubmitting(true);

    /**
     * Expose Apollo Client, Mutate HOC with arguments curried in, and
     * remaining Formik props
     */
    onSubmit(values, { mutate, client, ...props }).then(async res => {
      await onComplete(res);
      setTimeout(() => {
        props.setSubmitting(false);
      }, 1000);
    });
  };

  return handleSubmit;
};

export { mergeOrderedFields, createHandleSubmitFromMutation };

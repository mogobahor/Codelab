import { storiesOf } from '@storybook/react';
import React from 'react';
import Form from 'src/components/Form/Form';
import { INPUT_TYPES } from 'src/components/Input/Input';
import { FormDecorator, StorybookFormWrapper } from 'src/utils/utils';

storiesOf('Form Layout', module)
  .addDecorator(FormDecorator)
  .add('2 column layout with label', () => {
    const fields = [
      {
        name: 'firstName',
        inputType: INPUT_TYPES.Text,
        placeholder: 'John',
        label: 'First Name',
        layout: {
          wrapperLayout: {
            xs: 24,
            sm: 12,
          },
          labelLayout: {
            xs: 24,
            sm: 5,
          },
        },
        validation: [{ required: true, msg: 'Required!!' }],
      },
      {
        name: 'right',
        inputType: INPUT_TYPES.Text,
        placeholder: 'right',
        label: 'right',
        layout: {
          wrapperLayout: {
            xs: 24,
            sm: 12,
          },
          labelLayout: {
            xs: 24,
            sm: 5,
          },
        },
        validation: [{ required: true, msg: 'Required!!' }],
      },
      {
        name: 'bottom',
        inputType: INPUT_TYPES.Text,
        placeholder: 'bottom',
        label: 'bottom',
        layout: {
          wrapperLayout: {
            xs: 24,
            sm: 12,
          },
          labelLayout: {
            xs: 24,
            sm: 5,
          },
        },
      },
      {
        name: 'left',
        inputType: INPUT_TYPES.Text,
        placeholder: 'left',
        label: 'left',
        layout: {
          wrapperLayout: {
            xs: 24,
            sm: 12,
          },
          labelLayout: {
            xs: 24,
            sm: 5,
          },
        },
      },
    ];
    return (
      <Form
        fields={fields}
        onSubmit={() =>
          new Promise(resolve => {
            setTimeout(() => {
              console.log('submitting'), resolve();
            }, 1000);
          })
        }
      />
    );
  })
  .add('Form inline', () => {
    const fields = [
      {
        name: 'first_name',
        inputType: 'text',
        placeholder: 'First Name',
        label: 'FirstName',
        layout: {
          labelLayout: {
            sm: 10,
          },
        },
      },
      {
        name: 'last_name',
        inputType: 'text',
        placeholder: 'Last Name',
        label: 'LastName',
        layout: {
          labelLayout: {
            sm: 10,
          },
        },
      },
    ];
    return (
      <StorybookFormWrapper
        fields={fields}
        submitButton={{ text: 'Register' }}
        layout="inline"
      />
    );
  });

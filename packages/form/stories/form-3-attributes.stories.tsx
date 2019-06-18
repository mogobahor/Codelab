import { storiesOf } from '@storybook/react';
import React from 'react';
import Form from 'src/components/Form/Form';
import { INPUT_TYPES } from 'src/components/Input/Input';
import {
  FormDecorator,
  ON_COMPLETE,
  ON_SUBMIT,
  StorybookFormWrapper,
} from 'src/utils/utils';

storiesOf('Form Attributes', module)
  .addDecorator(FormDecorator)
  .add('hidden input', () => {
    const fields = [
      {
        inputType: INPUT_TYPES.Text,
        name: 'name',
        value: 'Some Value',
        attributes: { hidden: true },
      },
    ];
    return <StorybookFormWrapper fields={fields} />;
  })
  .add('with sync fields', () => {
    const fields = [
      {
        name: 'inputA',
        inputType: INPUT_TYPES.Text,
        value: '',
      },
      {
        name: 'inputB',
        inputType: INPUT_TYPES.Text,
        value: '',
        attributes: {
          sync: 'inputA', // Syncs to target field name's value
        },
      },
    ];
    return <StorybookFormWrapper fields={fields} />;
  })
  // .add('dynamic generate field', () => <GenerationForm />)
  .add('render props form', () => {
    const fields = [
      {
        inputType: INPUT_TYPES.Text,
        name: 'myUsername',
      },
      {
        inputType: INPUT_TYPES.Color,
        name: 'background',
        value: '#fff',
      },
      {
        inputType: INPUT_TYPES.Number,
        name: 'counter',
        value: '1',
      },
    ];

    return (
      <Form
        mode="renderProps"
        fields={fields}
        onSubmit={ON_SUBMIT}
        onComplete={ON_COMPLETE}
      >
        {({ FormFields, Fields, FormButton, ...rest }) => {
          console.log({ rest }); // tslint:disable-line
          return (
            <div>
              <FormFields Fields={Fields} className={''} />
              <FormButton isSubmitting={() => {}} handleSubmit={() => {}}>
                Click me
              </FormButton>
            </div>
          );
        }}
      </Form>
    );
  });

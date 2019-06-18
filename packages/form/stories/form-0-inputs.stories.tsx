import { storiesOf } from '@storybook/react';
import 'antd/dist/antd.css';
import React from 'react';
import Form from 'src/components/Form/Form';
import { INPUT_TYPES } from 'src/components/Input/Input';
import {
  FormDecorator,
  ON_COMPLETE,
  ON_SUBMIT,
  StorybookFormWrapper,
} from 'src/utils/utils';

storiesOf('Default Form', module)
  .addDecorator(FormDecorator)
  .add('Text Input', () => {
    const fields = [
      {
        inputType: INPUT_TYPES.Text,
        name: 'name',
        placeholder: 'Name',
        type: 'string',
      },
    ];
    return <StorybookFormWrapper fields={fields} />;
  })
  .add('With Validation', () => {
    const fields = [
      {
        inputType: INPUT_TYPES.Text,
        name: 'name',
        value: '',
        placeholder: 'Name',
        type: 'string',
        validation: [
          { min: 2, msg: 'Too Short!' },
          { max: 20, msg: 'Too Long!' },
          { required: true, msg: 'Required!!' },
        ],
      },
    ];
    return <StorybookFormWrapper fields={fields} />;
  })
  .add('With Default Value', () => {
    const fields = [
      {
        inputType: INPUT_TYPES.Text,
        name: 'name',
        value: 'Codelab',
        placeholder: 'Name',
        type: 'string',
      },
    ];
    return <StorybookFormWrapper fields={fields} />;
  })
  .add('with mixed input type', () => {
    const fields = [
      {
        inputType: INPUT_TYPES.Text,
        name: 'name',
        value: 'fixed', //
        placeholder: 'Model Name',
        validation: [
          { min: 2, msg: 'Too Short!' },
          { max: 20, msg: 'Too Long!' },
          { required: true, msg: 'Required!!' },
        ],
        attributes: {
          id: 'name',
        },
      },
      {
        inputType: INPUT_TYPES.Password,
        name: 'password',
        value: '',
        placeholder: 'Enter Password:',
      },
      {
        inputType: INPUT_TYPES.Textarea,
        name: 'message',
        value: 'are we one?',
        placeholder: 'Leave a message',
        validation: [
          // { min: 2, msg: 'Too Short!' },
          // { max: 20, msg: 'Too Long!' },
          { required: true, msg: 'Required!!' },
        ],
      },
      // Checkbox
      {
        inputType: INPUT_TYPES.Checkbox,
        name: 'gender',
        label: 'Is Male? (check box)',
        value: true,
        placeholder: '',
        style: 'grid',
        // validation: [
        //   // { required: true, msg: 'Required!!' }
        // ],
      },
      {
        inputType: INPUT_TYPES.Radio,
        // style="grid"  <--- you will add this,
        name: 'os',
        label: 'which mobile OSs  are you using?',
        style: 'grid',
        options: [
          {
            label: 'IOS',
            value: 'ios',
            col: 24,
          },
          {
            label: 'Android',
            value: 'android',
            col: 24,
          },
          {
            label: 'Other',
            value: 'other',
            col: 24,
          },
        ],
        value: '',
        placeholder: 'Operating System',
        validation: [
          // { required: true, msg: 'Required!!' }
        ],
      },
      {
        inputType: INPUT_TYPES.Slider,
        defaultValue: 0.25,
        max: 1,
        min: 0,
        type: 'string',
        label: 'Basic Slider',
        name: 'slider_value',
        step: 0.1,
        validation: [],
      },
      {
        inputType: INPUT_TYPES.Select,
        name: 'os_type',
        label: 'which mobile OSs are you using?',
        // style: "grid",
        defaultValue: 'ios',
        options: [
          {
            label: 'IOS',
            value: 'ios',
          },
          {
            label: 'Android',
            value: 'android',
          },
          {
            label: 'Other',
            value: 'other',
          },
        ],
        placeholder: 'Choose OS',
        validation: [
          // { required: true, msg: 'Required!!' }
        ],
      },
      {
        inputType: INPUT_TYPES.Datetime,
        name: 'birthday',
        value: '1994-05-05',
      },
      {
        inputType: INPUT_TYPES.Color,
        name: 'background',
        value: '#fff',
      },
    ];
    return (
      <>
        <Form
          fields={fields}
          onSubmit={ON_SUBMIT}
          onComplete={ON_COMPLETE}
          submitButton={{ text: 'Click me' }}
        />
      </>
    );
  });

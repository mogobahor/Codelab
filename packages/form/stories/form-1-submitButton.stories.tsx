import { storiesOf } from '@storybook/react';
import 'antd/dist/antd.css';
import React from 'react';
import { FormDecorator, StorybookFormWrapper } from 'src/utils/utils';

storiesOf('Submit Button', module)
  .addDecorator(FormDecorator)
  .add('custom submit text', () => {
    const fields = [
      {
        inputType: 'text',
        name: 'name',
        placeholder: 'Name',
        type: 'string',
      },
    ];
    return (
      <StorybookFormWrapper
        submitButton={{ text: 'Custom Text' }}
        fields={fields}
      />
    );
  })
  .add('hidden submit button ', () => {
    const fields = [
      {
        inputType: 'text',
        name: 'name',
        value: 'Some Value',
      },
    ];
    return (
      <StorybookFormWrapper
        submitButton={{
          hide: true,
        }}
        fields={fields}
      />
    );
  });

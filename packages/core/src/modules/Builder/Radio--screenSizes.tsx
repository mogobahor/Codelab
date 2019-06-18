import React from 'react';
import { Screen } from '@codelab/layout';
import { Form } from '@codelab/form';
import { Mutation } from 'react-apollo';
import { SET_CONFIG } from 'src/state/apollo-link-state/config/configState';
import styled from 'styled-components';

const ScreenSizeSelector = styled.div`
  section {
    margin: 0;
  }
  form {
    padding: 0;
    display > div {
      height: auto;
      display: flex;
    }

    span {
      color: white;
    }

    .ValidationErrors {
      display: none;
    }
  }
`;

export const screenSizeFields = [
  {
    inputType: 'radio',
    name: 'screenSize',
    options: [
      {
        label: 'XXS',
        value: Screen.Size.XXS,
      },
      {
        label: 'XS',
        value: Screen.Size.XS,
      },
      {
        label: 'SM',
        value: Screen.Size.SM,
      },
      {
        label: 'MD',
        value: Screen.Size.MD,
      },
      {
        label: 'LG',
        value: Screen.Size.LG,
      },
    ],
    value: Screen.Size.SM, // change to default value
    placeholder: '',
    validation: [], // TODO: shouldn't need this by default
  },
];

const ON_SUBMIT = input => {
  return new Promise((resolve, reject) => {
    console.log(input);
    resolve('good');
  });
};

const RadioScreenSizes = () => {
  return (
    <Mutation mutation={SET_CONFIG}>
      {setConfig => {
        return (
          <ScreenSizeSelector>
            <Form
              fields={screenSizeFields}
              onSubmit={input => {
                return new Promise((resolve, reject) => {
                  setConfig({
                    variables: { config: { ...input } },
                  });
                  resolve();
                });
              }}
              onComplete={() => {}}
              submitButton={{ hide: true }}
              submitOnChange={true}
            />
          </ScreenSizeSelector>
        );
      }}
    </Mutation>
  );
};

export default RadioScreenSizes;

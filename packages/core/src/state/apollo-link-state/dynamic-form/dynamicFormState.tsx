import gql from 'graphql-tag';
import { find, remove } from 'lodash';

export const inputDef = `
type Option {
  label: String!
  value: String!
}

type Input {
  id: String!
  name: String!
  inputType: String!
  placeholder: String!
  options: [Option]
}
`;

export const GET_INPUTS = gql`
  query GetInputs {
    inputs @client {
      inputType
      name
      id
      label
      placeholder
      options
    }
  }
`;

export const CREATE_INPUT = gql`
  mutation CreateInput($input: Input) {
    createInput(input: $input) @client
  }
`;

export const DELETE_INPUT = gql`
  mutation DeleteInput($name: String) {
    deleteInput(name: $name) @client
  }
`;

const TYPENAME_INPUT = 'TYPENAME_INPUT';

const normalizeInputObject = ({
  inputType,
  name,
  placeholder,
  label,
  options,
}: any) => ({
  inputType,
  name,
  placeholder,
  id: name,
  label: label || '',
  options: options || [],
  __typename: TYPENAME_INPUT,
});

const dynamicFormState = {
  defaults: {
    inputs: [
      normalizeInputObject({
        __typename: TYPENAME_INPUT,
        inputType: 'text',
        placeholder: 'name',
        name: 'name',
        id: 'name',
      }),
    ],
  },
  resolvers: {
    Query: {
      input: (_, variables: { id: string }, { cache }) => {
        const { inputs } = cache.readQuery({ query: GET_INPUTS });
        return find(inputs, { id: variables.id });
      },
    },
    Mutation: {
      createInput: (_, { input }, { cache }) => {
        const { inputs } = cache.readQuery({ query: GET_INPUTS });
        const matchedInput: any = find(inputs, { name: input.name });
        if (matchedInput) {
          const id = `${TYPENAME_INPUT}:${matchedInput.id}`;
          const fragment = gql`
            fragment settingInput on ${TYPENAME_INPUT} {
              label
              placeholder
              options
            }
          `;
          const oldInput = cache.readFragment({ fragment, id });
          cache.writeFragment({
            fragment,
            id,
            data: { ...oldInput, ...input },
          });
          return;
        }
        const newInput = normalizeInputObject(input);
        const data = {
          inputs: [...inputs, newInput],
        };
        cache.writeQuery({
          data,
          query: GET_INPUTS,
        });
        return data.inputs;
      },
      deleteInput: (_, { name }, { cache }) => {
        const { inputs } = cache.readQuery({ query: GET_INPUTS });
        remove(inputs, (input: any) => name === input.name);
        const data = {
          inputs,
        };
        cache.writeQuery({
          data,
          query: GET_INPUTS,
        });
        return data.inputs;
      },
    },
  },
};

export default dynamicFormState;

import React from 'react';
import withPageProps from 'src/hoc/withPageProps';
import Query from 'src/utils/Query';
import {
  GET_MODAL,
  GET_MODALS,
} from 'src/state/apollo-link-state/modal/modalState';
import {
  GET_EXAMPLE,
  SET_EXAMPLE,
} from 'src/state/apollo-link-state/example/exampleState';
import { Mutation } from 'react-apollo';
import { Form } from '@codelab/form';
import { screenSizeFields } from 'src/modules/Builder/Radio--screenSizes';
import { map } from 'lodash';

const AllModals = () => (
  <Query query={GET_MODALS}>
    {({ modals }) => {
      console.log(modals);
      return (
        <ul>
          {modals.map(modal => {
            return <li key={modal.id}>{modal.id}</li>;
          })}
        </ul>
      );
    }}
  </Query>
);

const SingleModal = id => (
  <Query query={GET_MODALS}>
    {({ modals, refetch }) => {
      return (
        <Query query={GET_MODAL} variables={id}>
          {({ modal }) => {
            console.log(modal);
            return <li key={modal.id}>{modal.id}</li>;
          }}
        </Query>
      );
    }}
  </Query>
);

const ApolloWithForm = () => (
  <Mutation mutation={SET_EXAMPLE}>
    {setExample => {
      return (
        <Form
          fields={screenSizeFields}
          onSubmit={input => {
            return new Promise((resolve, reject) => {
              setExample({
                variables: { example: { ...input } },
              });
              resolve('good');
            });
          }}
          onComplete={() => {}}
        />
      );
    }}
  </Mutation>
);

const ApolloExample = () => (
  <Query query={GET_EXAMPLE}>
    {({ example }) => {
      console.log(example);
      return (
        <ul>
          {map(example, (val, key) => {
            return (
              <li key={key}>
                <b>{key}</b> : {val}
              </li>
            );
          })}
        </ul>
      );
    }}
  </Query>
);

const ExamplePage = props => {
  return (
    <section>
      <h2> Apollo With Form </h2>
      {/*<ApolloWithForm />*/}
      {/*<ApolloExample />*/}

      <h2> Link State Example </h2>
      <AllModals />
      {/*<SingleModal id={ModalIDs.Register} />*/}
    </section>
  );
};
export default withPageProps({ hasSidebar: false })(ExamplePage);

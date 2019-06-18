import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import ApolloMockingProvider from 'tests/mocks/ApolloMockingProvider';
import { ModelList } from 'src/modules/Model/components/Model-list--layout';
import mocks from 'tests/mocks/mocks';
import Model from 'src/modules/Model/data/Model';
import Query from '../src/utils/Query';

const ModelListWithData = () => {
  return (
    <Query query={Model.listModels}>
      {({ data }) => {
        return (
          <ModelList models={data.listModels.items}>
            {(model: any) => <div> {model.name} </div>}
          </ModelList>
        );
      }}
    </Query>
  );
};

storiesOf('ModelList', module).add('renders a list', () => {
  const customResolvers = mocks({
    model: 5,
    field: 2,
  });

  const story = (
    <ApolloMockingProvider customResolvers={customResolvers}>
      <ModelListWithData />
    </ApolloMockingProvider>
  );

  return story;
});

import React from 'react';
import { APPS_QUERY } from 'src/components/App/App--queries';
import Element from 'src/components/Element/Element';
import { ELEMENTS_GET_QUERIES } from 'src/components/Element/Element-queries--getAll';
import { Models } from 'src/graphql/modelTypes';
import withPageProps from 'src/hoc/withPageProps';
import Query from 'src/utils/Query';

type UrlParams = {
  url: {
    params: {
      username: string;
      app: string;
    };
  };
};

type AppResults = {
  app: any;
};

const App = () => (
  <Query<AppResults>
    query={APPS_QUERY}
    displayName={Models.App}
    variables={{
      where: {
        slug: 'e-commerce-store',
      },
    }}
  >
    {({ data }) => {
      return null;
    }}
  </Query>
);

const ElementsList = () => {
  return (
    <Query<{ elements: Element[] }, any>
      displayName={Models.Element}
      query={ELEMENTS_GET_QUERIES}
    >
      {({ data }) => (
        <>
          {data!.elements
            ? data!.elements.map(element => element.render())
            : null}
        </>
      )}
    </Query>
  );
};

const AppPage = (props: UrlParams) => {
  const {
    url: {
      params: { username, app },
    },
  } = props;

  return (
    <section className="container">
      <h2>App: {app}</h2>
      <h3>Username: {username}</h3>
      <ElementsList />
      <App />
    </section>
  );
};

export default withPageProps({ hasSidebar: true })(AppPage);

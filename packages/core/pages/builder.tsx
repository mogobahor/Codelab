import { getWindowWidth } from '@codelab/layout';
import gql from 'graphql-tag';
import React from 'react';
import JSONPretty from 'react-json-pretty';
import Page from 'src/components/Builder/Page/PageComponent';
import { modes } from 'src/components/DomComponent/Dom-context';
import withPageProps from 'src/hoc/withPageProps';
import { GET_PAGES } from 'src/state/apollo-link-state/layout/layoutState';
import Query from 'src/utils/Query';

const JSONPrettyMon = require('react-json-pretty/dist/monikai');

export const GET_CSS_TEMPLATES = gql`
  query cssTemplates {
    cssTemplates {
      name
      property {
        value
      }
      options {
        value
      }
    }
  }
`;

export const GET_CSS_INSTANCES = gql`
  query cssInstances {
    cssInstances {
      name
      property {
        value
      }
      option {
        value
      }
    }
  }
`;

/**
 * Provides CSS rules with options to select from
 */
const CSSTemplates = () => (
  <Query query={GET_CSS_TEMPLATES}>
    {data => {
      return <JSONPretty data={data} theme={JSONPrettyMon} />;
    }}
  </Query>
);

/**
 * A CSS Rule, basically a CSSTemplate with a chosen value
 */
const CSSInstance = () => (
  <Query query={GET_CSS_INSTANCES}>
    {data => {
      return <JSONPretty data={data} theme={JSONPrettyMon} />;
    }}
  </Query>
);

// class Page {
//   constructor() {}
// }

const Pages = () => (
  <Query query={GET_PAGES}>
    {data => {
      console.log(data);
      // const Page = new Page();

      const page = data.pages[0];
      // console.log(page);
      return <Page page={page} mode={modes.EDITABLE} />;
    }}
  </Query>
);

const Builder = () => {
  return (
    <section>
      <h2>Pages</h2>
      <h2>Window size: {getWindowWidth()}</h2>
      <Pages />
    </section>
  );
};

export default withPageProps({ hasSidebar: true })(Builder);

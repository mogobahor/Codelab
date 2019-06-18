import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Loader from 'src/components/snippets/Loader';
import withPageProps from 'src/hoc/withPageProps';
import ModelShow from 'src/modules/Model/components/Model-show';
import { getModel } from 'src/state/graphql/generated/queries';

const ModelShowPage = props => {
  const { id } = props.url.params;

  return (
    <>
      <Query query={gql(getModel)} variables={{ id }}>
        {({ loading, error, data }) => {
          if (loading) return <Loader />;
          if (error) return `Error! ${error.message}`;
          return <ModelShow model={data.getModel} />;
        }}
      </Query>
    </>
  );
};

export default withPageProps()(ModelShowPage);

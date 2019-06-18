import ModelUpdateModal from 'src/modules/Model/components/Model-update--modal';
import { Mutation } from 'react-apollo';
import { getQueryParam, redirectTo } from '../../src/utils/routeHelpers';
import { QueryParams, RouteAction } from '../../src/route/actions';
import Model from '../../src/modules/Model/data/Model';
import { mutateWith } from 'src/utils/apolloHelper';
import Query from 'src/utils/Query';
import withPageProps from 'src/hoc/withPageProps';

export const ModelUpdatePage = props => {
  const action = getQueryParam(QueryParams.ACTION, props);
  const visible = action === RouteAction.UPDATE;
  const id = getQueryParam(QueryParams.ID, props);

  return id ? (
    <Query query={Model.getModel} variables={{ id }}>
      {({ getModel }) => (
        <Mutation
          mutation={Model.updateModel}
          refetchQueries={[Model.LIST_MODELS]}
          awaitRefetchQueries={true}
        >
          {updateModel => (
            <ModelUpdateModal
              updateModel={mutateWith(updateModel)}
              model={getModel}
              visible={visible}
              handleOk={() => redirectTo(Model.INDEX)}
              handleCancel={() => redirectTo(Model.INDEX)}
              onComplete={() => redirectTo(Model.INDEX)}
            />
          )}
        </Mutation>
      )}
    </Query>
  ) : null;
};

export default withPageProps()(ModelUpdatePage);

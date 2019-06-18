import React from 'react';
import { Mutation } from 'react-apollo';
import { redirectTo, getVisibilityFromURL } from 'src/utils/routeHelpers';
import { RouteAction, QueryParams } from 'src/route/actions';
import Model from 'src/modules/Model/data/Model';
import ModelCreateModal from 'src/modules/Model/components/Model-create--modal';
import { mutateWith } from 'src/utils/apolloHelper';

export const ModelPageCreate = props => {
  const visibility = getVisibilityFromURL(
    { param: QueryParams.ACTION, action: RouteAction.CREATE },
    props,
  );

  return (
    <Mutation
      mutation={Model.createModel}
      refetchQueries={[Model.LIST_MODELS]}
      awaitRefetchQueries={true}
    >
      {createModel => (
        <ModelCreateModal
          visible={visibility}
          createModel={mutateWith(createModel)}
          handleOk={() => redirectTo(Model.INDEX)}
          handleCancel={() => redirectTo(Model.INDEX)}
          onComplete={() => redirectTo(Model.INDEX)}
        />
      )}
    </Mutation>
  );
};

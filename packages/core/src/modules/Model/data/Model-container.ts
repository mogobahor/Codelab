import gql from 'graphql-tag';
import { omit } from 'lodash';
import { graphql } from 'react-apollo';
import { compose } from 'recompose';
import {
  createModel,
  updateModel,
} from 'src/state/graphql/generated/mutations';
import { getModel, listModels } from 'src/state/graphql/generated/queries';

export const withModelItem = compose(
  graphql(gql(getModel), {
    props: (props: any) => ({
      model: props.data.getModel || null,
      subscribeToModel: params => {},
    }),
  }),
);

export const withModelList = compose(
  graphql(gql(listModels), {
    name: 'list', // replaces 'data'
    options: {
      fetchPolicy: 'network-only',
    },
    props: (props: any) => ({
      models: props.list.listModels ? props.list.listModels.items : [],
      // subscribeToNewModels: (params) => {
      // },
    }),
  }),
);

export const withModelCreate = compose(
  graphql(gql(createModel), {
    name: 'create',
    options: {
      // fetchPolicy: 'network-only',
      refetchQueries: () => ['ListModels'],
    },
    props: (props: any) => ({
      createModel: input => {
        return props
          .create({
            variables: {
              input,
            },
            awaitRefetchQueries: true,
          })
          .then(() => {
            props.ownProps.mutationSubscription.next(true);
          });
      },
    }),
  }),
);

export const deleteMutation = (deleteMutation, id) => {
  return deleteMutation({
    variables: {
      input: {
        id,
      },
    },
  });
};

export const withModelUpdate = compose(
  graphql(gql(updateModel), {
    name: 'update',
    props: (props: any) => ({
      updateModel: input =>
        props.update({
          variables: {
            input: omit(input, '__typename'),
          },
        }),
    }),
  }),
);

export const withModelDetail = compose(
  graphql(gql(getModel), {
    name: 'detail',
    options: (props: any) => ({
      fetchPolicy: 'cache-and-network',
      variables: {
        id: props.url.params.id,
      },
    }),
    props: (props: any) => ({
      model: props.detail.getModel ? props.detail.getModel : null,
    }),
  }),
);

import React from 'react';
import { compose, branch, renderComponent, withState } from 'recompose';
import withLifecycle from '@hocs/with-lifecycle';
import { withModelDetail } from '../data/Model-container';
import Loader from '../../../components/snippets/Loader';

const ModelShowContainer = compose(
  withState('loading', 'setLoading', true),
  withLifecycle({
    onDidMount: (props) => {
      setTimeout(() => {
        props.setLoading(false);
      }, 2000);
    },
  }),
  withModelDetail,
  branch(
    props => (props.model == null) || props.loading,
    renderComponent(
      () => (<Loader />),
    ),
  ),
);

export default ModelShowContainer;

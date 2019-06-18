import { compose, defaultProps, withHandlers } from 'recompose';
import { BehaviorSubject } from 'rxjs';
import Router from '../../../route/Router';
import { withModelDetail, withModelUpdate } from '../data/Model-container';

const ModelUpdateContainer = compose(
  defaultProps({
    // When complete with mutation
    mutationSubscription: new BehaviorSubject(false),
  }),
  withHandlers({
    redirectTo: props => (route) => {
      console.log(props);
      Router.pushRoute(route);
    },
  }),
  withHandlers({
    handleOk: props => (event) => {
      console.log('handleOk');
      props.redirectTo('model.apps.tsx');
    },
    handleCancel: props => (event) => {
      console.log('handleCancel');
      props.redirectTo('model.apps.tsx');
    },
    onComplete: props => () => {
      props.mutationSubscription.subscribe({
        next: (val) => {
          console.log(`received sub value of ${val}`);
          if (val) {
            props.redirectTo('model.apps.tsx');
          }
        },
      });
    },
  }),
  withModelDetail,
  withModelUpdate,
);

export default ModelUpdateContainer;

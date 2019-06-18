import { compose, defaultProps, withHandlers } from 'recompose';
import { BehaviorSubject } from 'rxjs';
import {
  withModelCreate,
  withModelList,
} from 'src/modules/Model/data/Model-container';
import Router from 'src/universal/Router';


const ModelCreateContainer = compose(
  defaultProps({
    // When complete with mutation
    mutationSubscription: new BehaviorSubject(false),
  }),
  withHandlers({
    redirectTo: props => (route) => {
      console.log(props);
      console.log(route);
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
  withModelList,
  withModelCreate,
);

export default ModelCreateContainer;

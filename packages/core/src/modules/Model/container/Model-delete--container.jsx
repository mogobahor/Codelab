import { compose, withState, withHandlers } from 'recompose';

const ModelDeleteContainer = compose(
  withState('modalState', 'setModalState', {
    visible: false,
    data: {
      id: null,
    },
  }),
  withHandlers({
    handleOk: props => () => () => {
      props.deleteModel(props.modalState.data.id, () => {
        props.setModalState({ visible: false });
      });
    },
    handleCancel: props => () => {
      props.setModalState({ visible: false });
    },
  }),
);

export default ModelDeleteContainer;

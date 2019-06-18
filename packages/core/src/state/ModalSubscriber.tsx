import React from 'react';
import { Container, Provider, Subscribe } from 'unstated';
import { ModalIDs } from 'src/state/apollo-link-state/modal/modalState';

export interface IModalContainer {
  state: {
    modal: ModalIDs;
  };

  toggleModal(ModalIDs?, data?: any): void;

  closeModal(): void;
}

class ModalContainer extends Container<{}> implements IModalContainer {
  state = {
    modal: null,
  };

  toggleModal = (modal = null, data = null) => {
    console.log(modal);

    this.setState({
      modal,
      data,
    });
  };

  closeModal = () => {
    this.setState({
      modal: null,
      data: null,
    });
  };
}

const modal = new ModalContainer();

interface IModalSubscriberProps {
  children(props: IModalContainer);
}

const ModalSubscriber: React.SFC<IModalSubscriberProps> = props => (
  <Provider inject={[modal]}>
    <Subscribe to={[ModalContainer]}>
      {(container: ModalContainer) => <>{props.children(container)}</>}
    </Subscribe>
  </Provider>
);

export default ModalSubscriber;

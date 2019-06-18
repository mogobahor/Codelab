import React from 'react';
import { Provider, Subscribe, Container } from 'unstated';
import { ConsoleLogger } from '@aws-amplify/core';

type ValueState = {
  value: any;
};

class ValueContainer extends Container<ValueState> {
  state = {
    value: {},
  };

  setValue = value => {
    this.setState({
      value,
    });
  };

  resetValue = () => {
    this.setState({
      value: {},
    });
  };
}

const modal = new ValueContainer();

const ValueSubscriber = props => (
  <Provider inject={[modal]}>
    <Subscribe to={[ValueContainer]}>
      {(container: ValueContainer) => <>{props.children(container)}</>}
    </Subscribe>
  </Provider>
);

export default ValueSubscriber;

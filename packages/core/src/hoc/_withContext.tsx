import React, { Component } from 'react';
import { ModalProvider } from 'src/context/ModalContext';

/**
 * This file loads data
 */
export const withContext = ComposedComponent =>
  class extends Component {
    render() {
      return (
        <ModalProvider>
          <ComposedComponent {...this.props} />
        </ModalProvider>
      );
    }
  };

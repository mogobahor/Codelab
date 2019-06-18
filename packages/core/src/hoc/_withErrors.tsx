import { notification } from 'antd';
import { GraphQLError } from 'graphql';
import React, { Component } from 'react';
import { errorSubject } from 'src/config/apolloClient';

/**
 * This file loads data
 */
export const withErrors = ComposedComponent =>
  class extends Component {
    private subscription;

    async componentWillUnmount() {
      this.subscription!.unsubscribe();
    }

    private notifyWithError(error: GraphQLError) {
      const { message, extensions } = error;
      const { code } = extensions!;

      notification['error']({
        message: code,
        description: message,
      });
    }

    render() {
      this.subscription = errorSubject.subscribe({
        next: (error: GraphQLError) => this.notifyWithError(error),
      });

      return <ComposedComponent {...this.props} />;
    }
  };

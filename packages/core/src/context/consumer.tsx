import React from 'react';
import { ServiceContext } from './context';

export const UserServiceConsumer = ({ children }) => {
  return (
    <ServiceContext.Consumer>
      {value => {
        const { userService } = value;
        return children({ authService: userService });
      }}
    </ServiceContext.Consumer>
  );
};

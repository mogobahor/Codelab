import React from 'react';
import UserCodelab from 'src/components/User/User-codelab';
import withPageProps from 'src/hoc/withPageProps';

const HomeWithAuth = props => {
  return (
    <>
      {/*<UserCurrent />*/}
      <UserCodelab />
      <h1> Home Page! </h1>
    </>
  );
};

// export default HomeWithAuth;
export default withPageProps({ hasSidebar: false })(HomeWithAuth);

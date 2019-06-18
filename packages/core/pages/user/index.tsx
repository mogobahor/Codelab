import { Col, Dropdown, Icon, Row } from 'antd';
import React from 'react';
import { IApp } from 'src/components/App/App';
import AppButtonCreate from 'src/components/App/App-button--create';
import AppDropdownActions from 'src/components/App/App-dropdown--actions';
import AppModalCreate from 'src/components/App/App-modal--create';
import AppModalUpdate from 'src/components/App/App-modal--update';
import { Model } from 'src/components/Builder/interfaces';
import { IUser } from 'src/components/User/User';
import { USER_APPS_QUERY } from 'src/components/User/User--queries';
import { Models } from 'src/graphql/modelTypes';
import withPageProps from 'src/hoc/withPageProps';
import Link from 'src/route/Link';
import Query from 'src/utils/Query';
import styled from 'styled-components';

const AppItemStyle = styled.div`
  box-sizing: border-box;
  width: 100%;
  min-height: 100px;
  border: 1px solid #000;
  padding: 15px;
  h3 {
    text-align: center;
    i {
      float: right;
    }
    :after {
      content: '';
      clear: both;
    }
  }
`;

type AppProps = {
  app: Model<IApp>;
};

type UserProps = {
  user: Model<IUser>;
};

type AppListProps = {
  AppActions: React.FC<AppProps>;
  username: string;
};

const AppActions: React.FC<AppProps> = ({ app }) => {
  return (
    <Dropdown overlay={<AppDropdownActions app={app} />} trigger={['click']}>
      <Icon type="ellipsis" />
    </Dropdown>
  );
};
const AppItem: React.FC<AppProps & UserProps> = ({ app, user }) => {
  return (
    <AppItemStyle>
      <h3>
        <Link route="user.apps" params={{ username: user.slug, app: app.slug }}>
          <a>{app.name}</a>
        </Link>
        <AppActions app={app} />
      </h3>
    </AppItemStyle>
  );
};

const AppList: React.FC<AppListProps> = ({ username }) => (
  <section>
    <h1>Apps for {username}</h1>
    <Query<UserProps>
      displayName={Models.User}
      query={USER_APPS_QUERY}
      variables={{ where: { username: 'Codelab' } }}
    >
      {({ data }) => {
        const {
          user,
          user: { apps },
        } = data!;
        return (
          <>
            <h1>Review</h1>
            <Row style={{ margin: '0 -5px' }}>
              {apps!.map((app, index) => (
                <Col key={index} xs={12} md={8} style={{ padding: '5px' }}>
                  <AppItem app={app} user={user} />
                </Col>
              ))}
            </Row>
          </>
        );
      }}
    </Query>
  </section>
);

type AppUrlParams = {
  url: {
    params: {
      username: string;
    };
  };
};

const Apps = (props: AppUrlParams) => {
  const {
    url: {
      params: { username },
    },
  } = props;

  return (
    <section className="container">
      <AppModalCreate />
      <AppModalUpdate />
      <AppButtonCreate />
      <AppList AppActions={AppActions} username={username} />
    </section>
  );
};

export default withPageProps()(Apps);

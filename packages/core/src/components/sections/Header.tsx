import { Dropdown, Icon, Menu } from 'antd';
import React from 'react';
import { Mutation } from 'react-apollo';
import LinkAuthLogin, {
  AUTH_LOGOUT_MUTATION,
} from 'src/components/Auth/Link-auth--login';
import LinkAuthRegister from 'src/components/Auth/Link-auth--register';
import { User } from 'src/components/User/User';
import { USER_ME_QUERY } from 'src/components/User/User--queries';
import Query from 'src/utils/Query';
import styled from 'styled-components';

const userDropMenu = (
  <Menu>
    <Menu.Item>
      <Mutation mutation={AUTH_LOGOUT_MUTATION} refetchQueries={['me']}>
        {logout => {
          return (
            <a
              onClick={() => {
                User.logout();
                logout();
              }}
            >
              Log Out
            </a>
          );
        }}
      </Mutation>
      {/*<User>{userService => <a onClick={userService.logout}>Log Out</a>}</User>*/}
    </Menu.Item>
    {/*<Menu.Item>*/}
    {/*  <a*/}
    {/*    target="_blank"*/}
    {/*    rel="noopener noreferrer"*/}
    {/*    href="http://www.taobao.com/"*/}
    {/*  >*/}
    {/*    2nd menu item*/}
    {/*  </a>*/}
    {/*</Menu.Item>*/}
    {/*<Menu.Item>*/}
    {/*  <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">*/}
    {/*    3rd menu item*/}
    {/*  </a>*/}
    {/*</Menu.Item>*/}
  </Menu>
);

const UserDropdown = ({ user }) => (
  <Dropdown overlay={userDropMenu} trigger={['click']}>
    <a className="ant-dropdown-link" href="#">
      {user.username} <Icon type="down" />
    </a>
  </Dropdown>
);

const CustomDisabledMenuItem = styled.div`
  .ant-menu-item-disabled,
  .ant-menu-submenu-disabled {
    cursor: default;
  }
`;

const Header = props => (
  <Menu
    theme="dark"
    mode="horizontal"
    defaultSelectedKeys={['2']}
    style={{ lineHeight: '64px' }}
  >
    {/*<Menu.Item key="1">nav 1</Menu.Item>*/}
    {/*<Menu.Item key="2">nav 2</Menu.Item>*/}
    {/*<Menu.Item key="3">nav 3</Menu.Item>*/}
    <Menu.Item key="profile" style={{ float: 'right' }}>
      <Query query={USER_ME_QUERY}>
        {({ data: { me } }) => {
          return me ? <UserDropdown user={me} /> : null;
        }}
      </Query>
    </Menu.Item>
    {/* {props.user.authenticated ? <Profile user={props.user} /> : null}  */}
    <Menu.Item key="login" style={{ float: 'right' }}>
      <Query query={USER_ME_QUERY}>
        {({ data: { me } }) => (!me ? <LinkAuthLogin /> : null)}
      </Query>
    </Menu.Item>
    <Menu.Item key="register" style={{ float: 'right' }}>
      <Query query={USER_ME_QUERY}>
        {({ data: { me } }) => (!me ? <LinkAuthRegister /> : null)}
      </Query>
    </Menu.Item>
    <Menu.Item key="screenSize" style={{ float: 'right' }} disabled={true}>
      <style>
        {`
          .ant-menu-item-disabled,
          .ant-menu-submenu-disabled {
            cursor: default
          }
        `}
      </style>
      {/*<RadioScreenSizes />*/}
    </Menu.Item>
  </Menu>
);

export default Header;

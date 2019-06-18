import { IThemeContext } from '@codelab/style';
import styled from '@emotion/styled';
import { Tabs } from 'antd';
import { TabPaneProps, TabsProps } from 'antd/lib/tabs';
import React from 'react';

type MyTabsProps = TabsProps & {};

const MyTabs = styled((props: MyTabsProps) => <Tabs {...props} />)`
  /**
Modify alignment & width
 */
  .ant-tabs-nav {
    width: 100%;
    > div {
      width: 100%;
      display: flex;
      .ant-tabs-tab {
        flex-grow: 1;
        margin-right: 0px;
        width: 100%;
        text-align: center;
      }
    }
  }
  .ant-tabs-content {
    padding: ${(props: IThemeContext) => props.padding!.md || 0};
  }
`;

type MyTabPaneProps = TabPaneProps & {};

const MyTabPane = styled((props: MyTabPaneProps) => (
  <Tabs.TabPane {...props} />
))``;

export { MyTabs, MyTabPane };

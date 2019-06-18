import { IThemeContext } from '@codelab/style';
import styled from '@emotion/styled';
import { Tabs as AntdTabs } from 'antd';

// const TabPane = AntdTabs.TabPane;

interface ISpacing {
  margin?: string | number;
  padding?: string | number;
}

const Tabs = styled(AntdTabs)`
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
    padding: ${(props: IThemeContext) => props.padding.md || 0};
  }
`;

export default Tabs;

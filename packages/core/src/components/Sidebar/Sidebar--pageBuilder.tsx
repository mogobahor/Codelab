import { TabPane, Tabs } from '@codelab/component';
import React from 'react';
import Icon from 'src/components/Icon';
import TabComponents from 'src/components/Sidebar/Tab-components';
import TabLayers from 'src/components/Sidebar/Tab-layers';
import TabWorkflow from 'src/components/Sidebar/Tab-workflow';
import 'src/components/temp-style/grid.scss';

const SidebarPageBuilder = props => {
  console.log(props);
  const style = {
    display: 'block',
  };
  return (
    <Tabs
      padding={{ md: '0rem' }}
      defaultActiveKey="5"
      onChange={key => {
        console.log(key);
      }}
      style={{ height: '100%' }}
    >
      {/*<TabPane*/}
      {/*  tab={*/}
      {/*    <span>*/}
      {/*      <FontAwesomeIcon icon="sliders-h" />*/}
      {/*      <span style={style}>Pages</span>*/}
      {/*    </span>*/}
      {/*  }*/}
      {/*  key="1"*/}
      {/*>*/}
      {/*  <TabInputs />*/}
      {/*</TabPane>*/}
      {/*<TabPane*/}
      {/*  tab={*/}
      {/*    <span>*/}
      {/*      <FontAwesomeIcon icon="paint-brush" />*/}
      {/*      <span style={style}>Styles</span>*/}
      {/*    </span>*/}
      {/*  }*/}
      {/*  key="2"*/}
      {/*>*/}
      {/*  /!*<TabStyle />*!/*/}
      {/*</TabPane>*/}
      {/*<TabPane*/}
      {/*  tab={*/}
      {/*    <span>*/}
      {/*      <Icon icon="bars" />*/}
      {/*      <span style={style}>Layers</span>*/}
      {/*    </span>*/}
      {/*  }*/}
      {/*  key="3"*/}
      {/*>*/}
      {/*  <TabLayers />*/}
      {/*</TabPane>*/}
      {/*<TabPane*/}
      {/*  tab={*/}
      {/*    <span>*/}
      {/*      <FontAwesomeIcon icon="bars" />*/}
      {/*      <span style={style}>Layers</span>*/}
      {/*    </span>*/}
      {/*  }*/}
      {/*  key="3"*/}
      {/*>*/}
      {/*  <TabLayers />*/}
      {/*</TabPane>*/}
      {/*<TabPane*/}
      {/*  tab={*/}
      {/*    <span>*/}
      {/*      <FontAwesomeIcon icon="th-large" />*/}
      {/*      <span style={style}>Blocks</span>*/}
      {/*    </span>*/}
      {/*  }*/}
      {/*  key="4"*/}
      {/*>*/}
      {/*  <TabBlocks />*/}
      {/*</TabPane>*/}
      <TabPane
        tab={
          <span>
            <Icon icon="cogs" />
            <span style={style}>Components</span>
          </span>
        }
        key="5"
      >
        <TabComponents />
      </TabPane>
      <TabPane
        tab={
          <span>
            <Icon icon="sliders-h" />
            <span style={style}>Workflow</span>
          </span>
        }
        key="6"
      >
        <TabWorkflow />
      </TabPane>
    </Tabs>
  );
};

export default SidebarPageBuilder;

import { Col, Collapse, Row } from 'antd';
import React from 'react';
import ComponentTemplate from 'src/components/ComponentDraggable';
import {
  CONTAINER_TYPES,
  ELEMENT_TYPES,
} from 'src/components/DomComponent/Dom-config--types';
import styled from 'styled-components';

const Panel = Collapse.Panel;

const PanelHeader = styled.h5`
  /* color: white; */
`;
const customPanelStyle = {
  // background: 'rgba(19,3,51,0.9)',
  border: 0,
};

const basicGrids = [
  {
    key: 'Container',
    data: 'Container',
  },
  {
    key: '2 Columns',
    data: 'Grid.tsx',
  },
];

export const elements = {
  container: {
    __typename: CONTAINER_TYPES.CONTAINER,
    className: 'block',
    previewClass: 'w-100',
  },
  grid: {
    __typename: CONTAINER_TYPES.GRID,
    className: 'block',
    previewClass: 'w-50',
  },
  button: {
    __typename: CONTAINER_TYPES.ELEMENT,
    elementType: ELEMENT_TYPES.BUTTON,
    className: 'block',
    previewClass: 'd-inline',
  },
  text: {
    __typename: CONTAINER_TYPES.ELEMENT,
    elementType: ELEMENT_TYPES.TEXT,
    className: 'block',
    previewClass: 'd-inline',
  },
  image: {
    __typename: CONTAINER_TYPES.ELEMENT,
    elementType: ELEMENT_TYPES.IMAGE,
    className: 'block',
    previewClass: 'd-inline',
  },
  link: {
    __typename: CONTAINER_TYPES.ELEMENT,
    elementType: ELEMENT_TYPES.LINK,
    className: 'block',
    previewClass: 'd-inline',
  },
};

const handleDrag = (ev, data) => {
  ev.dataTransfer.setData(data.__typename, JSON.stringify(data));
};

const BasicLayout = () => {
  return (
    <Row align="middle" justify="center">
      {basicGrids.map((grid, index) => (
        <Col
          span={12}
          style={{
            borderBox: 'box-sizing',
            padding: '15px',
          }}
          key={`${index}`}
          // draggable={true}
          // onDragStart={e => this.handleDrag(e, grid.data)}
        >
          <ComponentTemplate id={index} />
          {/* <div
            style={{
              backgroundColor: 'grey',
              minHeight: '120px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div>{grid.key}</div>
          </div> */}
        </Col>
      ))}
    </Row>
  );
};

const ElementType = () => {
  return (
    <Row gutter={5}>
      {Object.keys(elements).map((type, index) => {
        const {
          previewClass,
          className,
          __typename,
          elementType,
        }: any = elements[type];
        return (
          <Col span={12} key={index}>
            {/* <span>
                  {elementType ? elementType : __typename.toUpperCase()}
                </span> */}
          </Col>
        );
      })}
    </Row>
  );
};

// need to enahnce, when unmount, remove the style tag
const TabBlocks = () => {
  return (
    <div>
      <style>{`
        .ant-layout, .ant-layout * { overflow: visible;}
        .react-draggable-dragging {
          outline: 2px solid blue;
          outline-offset: 2px;
        }
      `}</style>
      <Collapse bordered={false} defaultActiveKey={['1']}>
        <Panel header="Basic" key="1" style={customPanelStyle}>
          <BasicLayout />
        </Panel>
        <Panel header="Extra" key="2" style={customPanelStyle}>
          <ElementType />
        </Panel>
        <Panel header="Forms" key="3" style={customPanelStyle}>
          {/* <Draggable axis="both" position={{ x: 0, y: 0 }}>
          <div className="block">
            <div className="handle">Drag from here</div>
            <div>This readme is really dragging on...</div>
          </div>
        </Draggable> */}
        </Panel>
      </Collapse>
    </div>
  );
};

export default TabBlocks;

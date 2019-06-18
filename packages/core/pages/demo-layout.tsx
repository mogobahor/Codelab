import { Tree } from '@codelab/form';
import { Button } from 'antd';
import React from 'react';
import { Mutation } from 'react-apollo';
import { Page } from 'src/components/Builder/Page/PageComponent';
import { modes } from 'src/components/DomComponent/Dom-context';
import withPageProps from 'src/hoc/withPageProps';
import { TOGGLE_SIDEBAR } from 'src/state/apollo-link-state/layout/layoutState';
import styled from 'styled-components';

const LayoutWrapper = styled.div`
  padding: 5px;
  border: 2px dashed black;
  display: block;
  min-height: 300px;
  height: 90%;
  position: relative;
`;
const CenteredBlock = styled.div`
  position: absolute;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const BorderBox = styled.div`
  border: ${props =>
    props.isRoot && !props.hasChild ? '2px solid #108ee9' : '2px dashed gray'};
  padding: 5px;
  min-height: 150px;
`;

class NodeView extends React.Component<any, any> {
  handleDrop(ev) {
    const type = ev.dataTransfer.types[0];
    const dataTransfered = JSON.parse(ev.dataTransfer.getData(type));
    const { node, nodeParser } = this.props;
    if (type !== 'Container') {
      node.addChild(nodeParser({ name: dataTransfered.key }));
      ev.stopPropagation();
      this.forceUpdate();
    }
  }

  render() {
    const { node, nodeParser } = this.props;

    return (
      <BorderBox
        onDragOver={e => {
          e.preventDefault();
        }}
        onDragEnter={e => {
          const type = e.dataTransfer.types[0];
          // To-do
          // set pre- preview class
        }}
        onDragEnd={e => {}}
        onDrop={e => this.handleDrop(e)}
        isRoot={node.isRoot()}
        hasChild={node.hasChildren()}
      >
        {node.model.name}
        {node.hasChildren() &&
          node.children.map((node, index) => {
            return <NodeView node={node} key={index} nodeParser={nodeParser} />;
          })}
      </BorderBox>
    );
  }
}

interface ITreeViewState {
  tree: Tree | null;

  [propName: string]: any;
}

class TreeView extends React.Component {
  state: ITreeViewState = { tree: null };

  initTree(rootModel) {
    this.setState({ tree: new Tree(rootModel) });
  }

  render() {
    const { tree } = this.state;
    if (!tree) return <p> not have a tree yet </p>;
    const root = tree.getTree();
    return <NodeView node={root} nodeParser={model => tree.parse(model)} />;
  }
}

class Wrapper extends React.Component {
  treeInstance: TreeView | null = null;

  handleDrop(ev) {
    const type = ev.dataTransfer.types[0];
    const dataTransfered = JSON.parse(ev.dataTransfer.getData(type));
    if (this.treeInstance && type === 'container') {
      this.treeInstance.initTree({ name: dataTransfered.key });
    }
  }

  // handle for add container here.,
  render() {
    return (
      <LayoutWrapper
        onDrop={e => this.handleDrop(e)}
        onDragOver={e => e.preventDefault()}
      >
        <TreeView ref={tree => (this.treeInstance = tree)} />

        {this.props.children}
      </LayoutWrapper>
    );
  }
}

// const DemoLayoutPage = props => (
//   <Wrapper>
// <CenteredBlock>
//   <Mutation mutation={TOGGLE_SIDEBAR}>
//     {toggleSidebar => {
//       return (
//         <Button
//           size="large"
//           icon="plus"
//           type="primary"
//           onClick={() => toggleSidebar()}
//         />
//       );
//     }}
//   </Mutation>
// </CenteredBlock>
//   </Wrapper>
// );

const DemoLayoutPage = props => {
  const page = {
    title: 'Demo page',
    containers: [],
    __typename: 'Page',
  };
  return (
    <Page mode={modes.EDITABLE} page={page}>
      <CenteredBlock>
        <Mutation mutation={TOGGLE_SIDEBAR}>
          {toggleSidebar => {
            return (
              <Button
                size="large"
                icon="plus"
                type="primary"
                onClick={() => toggleSidebar()}
              />
            );
          }}
        </Mutation>
      </CenteredBlock>
    </Page>
  );
};

export default withPageProps({ hasSidebar: true })(DemoLayoutPage);

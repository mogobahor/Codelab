import { Tree } from '@codelab/form';
import { Button, Dropdown, Menu, Popconfirm } from 'antd';
import React from 'react';
import SortableTree, {
  addNodeUnderParent,
  changeNodeAtPath,
  removeNodeAtPath,
} from 'react-sortable-tree';
import withPageProps from 'src/hoc/withPageProps';
import ModalSubscriber from 'src/state/ModalSubscriber';

const tree = new Tree({
  id: 1,
  name: 'Parent',
  children: [
    {
      id: 11,
      children: [{ id: 111, name: 'A1' }],
      name: 'A',
    },
    {
      id: 12,
      children: [{ id: 121, name: 'B1' }, { id: 122, name: 'B2' }],
      name: 'B',
    },
    {
      id: 13,
      name: 'C',
    },
  ],
});
const fields = [
  {
    name: 'title',
    inputType: 'text',
    value: 'My Node',
    type: 'string',
    validation: [
      { required: true, msg: 'Required!!' },
      { min: 2, msg: 'Too Short!' },
      { max: 10, msg: 'Too Long!' },
    ],
  },
];

const submitButton = {
  text: 'Add Node',
};

interface DropMenuProps {
  addNode(): void;

  deleteNode(): void;

  editNode(): void;
}

const DropMenu = (props: DropMenuProps) => (
  <Dropdown overlay={menu(props)} trigger={['click']}>
    <Button>Options</Button>
  </Dropdown>
);

const menu = ({ addNode, deleteNode, editNode }: DropMenuProps) => (
  <Menu>
    <Menu.Item>
      <a onClick={addNode}>Add</a>
    </Menu.Item>
    <Menu.Item>
      <Popconfirm
        placement="topLeft"
        title="Are you sure delete this task?"
        onConfirm={deleteNode}
        onCancel={() => {}}
        okText="Yes"
        cancelText="No"
      >
        <a>Delete</a>
      </Popconfirm>
    </Menu.Item>
    <Menu.Item>
      <a onClick={editNode}>Edit</a>
    </Menu.Item>
  </Menu>
);

class NodeTitle extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      value: props.node.title,
      initialValue: props.node.title,
    };
  }

  render() {
    const { node, path, editingNode, setNodeTitle, setEditNode } = this.props;
    return (
      <>
        {editingNode && editingNode.node.title === node.title ? (
          <input
            type="text"
            autoFocus={true}
            style={{
              fontSize: '1.1rem',
            }}
            value={this.state.value}
            // handler : Set cursor to beginning of string
            // ref={input=> {
            //   if(input && this.state.value ===this.state.initialValue) {
            //     input.setSelectionRange(0,0)
            //     input.focus()
            //   }
            // } }
            // onFocus={e => {
            //   const val = e.target.value;
            //   e.target.value = '';
            //   e.target.value = val;
            // }}
            onBlur={e => {
              const value = e.target.value || this.state.initialValue;
              this.setState({ value }, () => setNodeTitle(value));
            }}
            onChange={e => this.setState({ value: e.target.value })}
          />
        ) : (
          <span onDoubleClick={setEditNode}>{node.title}</span>
        )}
      </>
    );
  }
}

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      TreeD3: null,
      reRender: false,
      treeData: [{ title: 'Chicken', children: [{ title: 'Egg' }] }],
      visible: false,
      currentNode: null,
      editingPath: null, // Show text input if editing
    };
  }

  getNodeKey = ({ node }) => node.title;

  async componentDidMount() {
    const res = await import('react-d3-tree');
    this.setState({ window, reRender: true, TreeD3: res.Tree });
  }

  addNode(data) {
    this.setState({
      visible: true,
    });
    // const treeData = Object.assign([], this.state.treeData);
    // treeData[0].children.push(data);
    // console.log(treeData);
    // this.setState({
    //   treeData,
    // });
  }

  onSubmit(currentNode, data) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const newTree = addNodeUnderParent({
          treeData: this.state.treeData,
          newNode: data,
          parentKey: currentNode.title,
          getNodeKey: this.getNodeKey,
        });

        this.setState({ treeData: newTree.treeData });

        resolve();
      }, 0);
    });
  }

  /**
   * Delete current and all children nodes
   */
  deleteNode(path) {
    const treeData = removeNodeAtPath({
      path,
      treeData: this.state.treeData,
      getNodeKey: this.getNodeKey,
    });

    this.setState({ treeData });
  }

  editNode(path) {
    const newNode = null;
    changeNodeAtPath({
      path,
      newNode,
      treeData: this.state.treeData,
    });
  }

  render() {
    const getNodeKey = ({ node }) => node.title;

    return (
      <ModalSubscriber>
        {({ toggleModal, closeModal }) => (
          <section>
            <button onClick={this.addNode.bind(this)}>Add Node</button>

            <div style={{ height: 400 }}>
              <SortableTree
                treeData={this.state.treeData}
                onChange={treeData => this.setState({ treeData })}
                getNodeKey={getNodeKey}
                // nodeContentRenderer={(props)=>{
                //   console.log(props)
                //   return <div>xxxxxx.</div>
                // }}
                // generateNodeProps={({ node, path }) => {
                //   const editingNode = getNodeAtPath({
                //     path: this.state.editingPath,
                //     treeData: this.state.treeData,
                //     getNodeKey: this.getNodeKey,
                //   });

                //   if (editingNode) {
                //     console.log(editingNode.node.title, node.title);
                //   }

                //   return {
                //     title: (
                //       <NodeTitle
                //         node={node}
                //         path={path}
                //         editingNode={editingNode}
                //         setEditNode={() => {
                //           this.setState({ editingPath: path });
                //           console.log('double click');
                //         }}
                //         setNodeTitle={title => {
                //           this.setState({
                //             treeData: changeNodeAtPath({
                //               path,
                //               getNodeKey: this.getNodeKey,
                //               treeData: this.state.treeData,
                //               newNode: { ...node, title },
                //             }),
                //           });
                //         }}
                //       />
                //     ),
                //     buttons: [
                //       <DropMenu
                //         addNode={() => {
                //           this.setState({ currentNode: node });
                //           toggleModal(ModalIDs.AddNode);
                //         }}
                //         deleteNode={() => {
                //           this.deleteNode(path);
                //         }}
                //         editNode={() => {}}
                //       />,
                //     ],
                //   };
                // }}
              />
            </div>

            {/* <div style={{ height: 1000, width: 1000 }}>
              {this.state.reRender && (
                <this.state.TreeD3
                  data={tree.getD3Tree()}
                  orientation="vertical"
                />
              )}
            </div> */}

            {/* <ModalContainer id={ModalIDs.AddNode} title="Add Node">
              <Form
                fields={fields}
                button={submitButton}
                onSubmit={this.onSubmit.bind(this, this.state.currentNode)}
                onComplete={closeModal}
              />
            </ModalContainer> */}
          </section>
        )}
      </ModalSubscriber>
    );
  }
}

export default withPageProps()(MyComponent);

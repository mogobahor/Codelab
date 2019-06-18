import TreeModel from 'tree-model';

// namespace ParentNode {
class Node {
  private parent?: Node;
  private isRoot: boolean;
  private children: Node[] = [];
  private data = [];
  private id: string;

  constructor(params: { isRoot?: boolean; id: string; parent?: Node }) {
    const { isRoot = false, id, parent } = params;
    this.isRoot = isRoot;
    this.id = id;
    this.parent = parent;
  }

  public addChild(node: Node) {
    this.children.push(node);
  }
}
// }

class MyTree {
  private root: Node;

  constructor(tree = {}) {
    this.root = this.buildTree(tree);
    // super(options!);
    // this.root = new Node({ isRoot: true, id });
  }

  private buildTree(tree): Node {
    const root = new Node({ isRoot: true, id: tree.id });

    return this.buildTreeRecursive(root, tree.children);
  }

  private buildTreeRecursive(parent: Node, children): Node {
    // If no children return
    if (!children || !children.length) {
      return parent;
    }

    children.forEach(child => {
      const { id } = child;

      const node = new Node({ id, parent });
      parent.addChild(node);

      return this.buildTreeRecursive(node, child.children);
    });

    return parent;
  }
}

class Tree extends TreeModel {
  private root;

  constructor(options) {
    super();
    this.root = this.parse(options);
  }

  getTree() {
    return this.root;
  }

  /**
   * Convert tree to react-d3-tree format
   *
   * https://github.com/bkrem/react-d3-tree
   */
  getD3Tree() {
    const action = node => {
      node.name = node.model.name;
      return node;
    };
    this.root.walk({ strategy: 'breadth' }, action);
    return this.root;
  }
}

export default Tree;

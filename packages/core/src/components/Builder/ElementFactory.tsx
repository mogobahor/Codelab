import React from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { ComponentTypes } from 'src/graphql/modelTypes';

const ResponsiveGridLayout = WidthProvider(Responsive);

interface IGrid extends IElementInput {
  grids?: string[]; // Array of Grid ID's for flat data structure
  elements?: IElement[];
  name?: string;
  // cols: number
}

export interface IElementInput {
  type: ComponentTypes;
  order: number;
  children?: (any) => React.ReactNode;
}

interface IElement {
  type: ComponentTypes;
  order: number;
  elements?: IElement[];
}

interface IContainer extends IElementInput {
  grids?: IElement[];
}

/**
 * AbstractFactory
 */
class ElementFactory extends React.Component<IElementInput> {
  constructor(props) {
    super(props);
  }

  static getFactory(props: IElementInput) {
    const { type } = props;

    switch (type) {
      case ComponentTypes.Container:
        return <Container {...props} />;

      case ComponentTypes.Grid:
        return <Grid {...props} />;

      default:
        return null;
    }
  }

  render() {
    const { type, order, children, ...props } = this.props;
    return ElementFactory.getFactory({
      type,
      order,
      children,
      ...props,
    });
  }
}

/**
 * AbstractClass
 */
class AbstractElement<P, S> extends React.Component<P, S & IElement> {}

const layouts = {
  lg: [
    { i: '0', x: 0, y: 0, w: 4, h: 1 },
    { i: '1', x: 4, y: 0, w: 4, h: 1 },
    { i: '2', x: 8, y: 0, w: 4, h: 1 },
  ],
  md: [
    { i: '0', x: 0, y: 0, w: 4, h: 4 },
    { i: '1', x: 4, y: 4, w: 4, h: 4 },
    { i: '2', x: 8, y: 4, w: 4, h: 4 },
  ],
  sm: [
    { i: '0', x: 0, y: 0, w: 6, h: 2 },
    { i: '1', x: 6, y: 0, w: 6, h: 2 },
    { i: '2', x: 0, y: 0, w: 6, h: 2 },
  ],
  xs: [
    { i: '0', x: 0, y: 2, w: 9, h: 1 },
    { i: '1', x: 0, y: 1, w: 9, h: 1 },
    { i: '2', x: 0, y: 0, w: 9, h: 1 },
  ],
  xxs: [
    { i: '0', x: 0, y: 0, w: 12, h: 2 },
    { i: '1', x: 0, y: 0, w: 12, h: 2 },
    { i: '2', x: 0, y: 0, w: 12, h: 2 },
  ],
};

/**
 * ConcreteFactory A
 */
class Container extends AbstractElement<IContainer, {}> {
  constructor(props: IContainer) {
    super(props);

    this.state = {
      type: props.type,
      order: props.order,
      elements: props.grids,
    };
  }

  render() {
    return (
      <>
        <br />
        Type: {this.state.type}
        <ResponsiveGridLayout
          className="layout"
          style={{
            backgroundColor: 'pink',
          }}
          layouts={layouts}
          width={800}
          breakpoints={{
            lg: 1200,
            md: 996,
            sm: 768,
            xs: 480,
            xxs: 0,
          }}
          cols={{ lg: 12, md: 12, sm: 12, xs: 12, xxs: 12 }}
          rowHeight={120}
        >
          {this.props.children!({ elements: this.state.elements })}
        </ResponsiveGridLayout>
      </>
    );
  }
}

interface IRGLProps {
  style?: any;
}

/**
 * ConcreteFactory B
 */
class Grid extends AbstractElement<IGrid & IRGLProps, IGrid> {
  constructor(props: IGrid & IRGLProps) {
    super(props);

    this.state = {
      type: props.type,
      order: props.order,
      elements: props.elements,
      grids: props.grids,
    };
  }

  render() {
    const style = { ...this.props.style, border: '1px solid blue' };
    return (
      <div style={style}>
        Type: {this.state.type} <br />
        Order: {this.state.order} <br />
        Name: {this.props.name}
      </div>
    );
  }
}

export { ElementFactory };

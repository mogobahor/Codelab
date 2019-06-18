import React from 'react';
import withPageProps from 'src/hoc/withPageProps';

const DecoratorPattern = () => <h1> Decorator Pattern </h1>;

interface Component {
  onClick(): void;
}

class Image implements Component {
  public onClick(): void {
    throw new Error('Method not implemented.');
  }
}

class Grid implements Component {
  public onClick(): void {
    throw new Error('Method not implemented.');
  }
}

abstract class ComponentDecorator implements Component {
  protected decoratedComponent: Component;

  public onClick(): void {
    throw new Error('Method not implemented.');
  }
}

interface Layout {}

class LayoutDecorator extends ComponentDecorator {
  private layout: Layout;

  constructor({ image, layout }: { image: Component; layout: Layout }) {
    super();
    this.decoratedComponent = image;
    this.layout = layout;
  }

  public getLayout(): Layout {
    return this.layout;
  }
}

// Usage
const image: Component = new Image();

/**
 * Layout is the tree data representation of Container/Grid nesting/index location information.
 */
const layout: Layout = Object();

/**
 * Image becomes decorated with LayoutDecorator as we drag an Image component to the content area.
 *
 * We use the decorator pattern to add behavior to objects belonging to the same class.
 *
 * This way, we can easily retrieve Layout info from our image, without having to find the image's parent Layout.
 */
const imageWithLayout: Component = new LayoutDecorator({ image, layout });

export default withPageProps()(DecoratorPattern);

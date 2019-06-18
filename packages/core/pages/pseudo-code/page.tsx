import React from 'react';

interface App {
  name: string;
  pages: [Page];
}

interface Page {
  title: string;
  containers: [Container];
}

interface Container {
  id: string;
  grids: [Grid];
}

interface Grid {
  id: string;
  index: number;
  name: string;
  elements: [Element];
  grids?: [Grid] | [];
}

interface Element {
  id: string;
  index: number;
}

// App component loops through its pages, this is one of the page
// props = app.pages[0]
const Page = (props: Page) => (
  <>
    {props.containers.map((container: Container) => (
      <Container {...container} />
    ))}
  </>
);

const Container = (props: Container) => (
  <>
    {props.grids.map((grid: Grid) => (
      <Grid {...grid} />
    ))}
  </>
);

const Grid = (props: Grid) => <div>hi</div>;

const Element = (props: Element) => ({});

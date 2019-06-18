import React, { Component } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { throttle } from 'lodash';
import './App.scss';
import { Grid, Layout, ScreenSize } from './components/Layout';

const ResponsiveGridLayout = WidthProvider(Responsive);

const MyLayout = new Layout();

const gridA = new Grid('a');
gridA.setDimension(ScreenSize.LG, 0, 0, 4, 2);
// gridA.setDimension(ScreenSize.SM, 0, 0, 3, 2);
// gridA.setDimension(ScreenSize.MD, 0, 0, 4, 2);

const gridB = new Grid('b');
gridB.setDimension(ScreenSize.LG, 4, 0, 4, 2);
// gridB.setDimension(ScreenSize.SM, 3, 0, 3, 2);

const gridC = new Grid('c');
gridC.setDimension(ScreenSize.LG, 8, 0, 4, 2);
// gridC.setDimension(ScreenSize.SM, 0, 0, 3, 2);

MyLayout.addGrid(gridA);
MyLayout.addGrid(gridB);
MyLayout.addGrid(gridC);

const myLayouts = MyLayout.getLayout();
console.log(myLayouts);

// console.log(MyLayout);

class MyFirstGrid extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // layout is an array of objects, see the demo for more complete usage
    return (
      <ResponsiveGridLayout
        className="layout"
        layouts={myLayouts}
        cols={{ lg: 12, md: 12, sm: 12, xs: 12, xxs: 12 }}
        // cols={{ lg: 12, md: 12, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={30}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        onLayoutChange={(currentLayout, allLayouts) => {
          // console.log(currentLayout, allLayouts);
        }}
      >
        <div key="a">a</div>
        <div key="b">b</div>
        <div key="c">c</div>
      </ResponsiveGridLayout>
    );
  }
}

class App extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      height: 0,
      windowSize: window.innerWidth,
    };
  }

  updateDimensions = throttle(() => {
    const size = window.innerWidth;

    if (size > 1200) {
      this.setState({ windowSize: 'lg' });
    }
    if (size <= 1200) {
      this.setState({ windowSize: 'md' });
    }
    if (size <= 996) {
      this.setState({ windowSize: 'sm' });
    }
    if (size <= 768) {
      this.setState({ windowSize: 'xs' });
    }
    if (size <= 480) {
      this.setState({ windowSize: 'xxs' });
    }

    this.setState({ width: size });
  }, 250);

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions.bind(this));
  }

  render() {
    return (
      <>
        Window size: {this.state.windowSize} : {this.state.width}
        <MyFirstGrid />
      </>
    );
  }
}

export default App;

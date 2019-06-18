import React from 'react';
import withPageProps from 'src/hoc/withPageProps';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { getWindowWidth } from '@codelab/layout';

const ResponsiveGridLayout = WidthProvider(Responsive);

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
const gridItemStyle = {
  border: 'solid 1px #000',
};

const DemoLayout = () => (
  <ResponsiveGridLayout
    className="layout"
    style={{
      backgroundColor: 'pink',
    }}
    width={800}
    layouts={layouts}
    breakpoints={{
      lg: 1200,
      md: 996,
      sm: 768,
      xs: 480,
      xxs: 0,
    }}
    cols={{ lg: 12, md: 12, sm: 12, xs: 12, xxs: 12 }}
    rowHeight={30}
  >
    <div key="0" style={gridItemStyle}>
      A
    </div>
    <div key="1" style={gridItemStyle}>
      B
    </div>
    <div key="2" style={gridItemStyle}>
      C
    </div>
  </ResponsiveGridLayout>
);

const LayoutPage = () => {
  return (
    <section>
      <h2>Width: {getWindowWidth()}</h2>
      <DemoLayout />
      {/*<Query query={GET_CONFIG}>*/}
      {/*  {({ config }) => {*/}
      {/*    return (*/}
      {/*      <ul>*/}
      {/*        {map(config, (val, key) => {*/}
      {/*          return (*/}
      {/*            <li key={key}>*/}
      {/*              <b>{key}</b> : {val}*/}
      {/*            </li>*/}
      {/*          );*/}
      {/*        })}*/}
      {/*      </ul>*/}
      {/*    );*/}
      {/*  }}*/}
      {/*</Query>*/}
      {/*<hr />*/}
      {/*<Mutation mutation={SET_CONFIG}>*/}
      {/*  {setConfig => {*/}
      {/*    return (*/}
      {/*      <Form*/}
      {/*        fields={screenSizeFields}*/}
      {/*        onSubmit={input => {*/}
      {/*          return new Promise((resolve, reject) => {*/}
      {/*            setConfig({*/}
      {/*              variables: { config: { ...input } },*/}
      {/*            });*/}
      {/*            resolve('good');*/}
      {/*          });*/}
      {/*        }}*/}
      {/*        onComplete={() => {*/}
      {/*        }}*/}
      {/*        submitOnChange={true}*/}
      {/*      />*/}
      {/*    );*/}
      {/*  }}*/}
      {/*</Mutation>*/}
      {/*<hr />*/}
      {/*<Form*/}
      {/*  fields={[]}*/}
      {/*  onSubmit={this.addGrid.bind(this)}*/}
      {/*  onComplete={ON_COMPLETE}*/}
      {/*/>*/}
      {/* <Button onClick={this.addGrid.bind(this)}>Add Grid</Button> */}
    </section>
  );
};

export default withPageProps({ hasSidebar: true })(LayoutPage);

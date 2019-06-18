import React from 'react';
import { APP_QUERY } from 'src/components/Sidebar/Tab-layers--queries';
import { Models } from 'src/graphql/modelTypes';
import Query from 'src/utils/Query';

const TabLayers = () => {
  const appNameSlug = '';
  return (
    <Query
      query={APP_QUERY}
      displayName={Models.App}
      variables={{ where: { slug: appNameSlug } }}
    >
      {data => {
        console.log(data);
        // const treeModel = domToTreeModel(page);
        return null;
        // return <TreeView treeData={treeModel} />;
      }}
    </Query>
  );
};

export default TabLayers;

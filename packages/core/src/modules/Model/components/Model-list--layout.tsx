import React from 'react';
import { Button } from 'antd';
import Link from 'src/route/Link';
import { RouteAction, QueryParams } from '../../../route/actions';
import Model from '../data/Model';

export const ModelDetailLink = ({ model }) => (
  <Link route="model.detail" params={{ id: model.id }}>
    <a className="Link-model--detail">{model.name}</a>
  </Link>
);

export const ModelEditLink = ({ model }) => (
  <Link
    route={Model.UPDATE}
    params={{ id: model.id, [QueryParams.ACTION]: RouteAction.UPDATE }}
  >
    <Button type="primary" className="Button-model--edit">
      Edit
    </Button>
  </Link>
);

export const ModelList = ({ models, children }) => (
  <ul>
    {models.map(model => (
      <li className="List-model--items" key={model.id}>
        {children(model)}
      </li>
    ))}
  </ul>
);

export const ModelCreateButton = () => (
  <Link
    prefetch={true}
    route={Model.CREATE}
    params={{ [QueryParams.ACTION]: RouteAction.CREATE }}
  >
    <Button type="primary" className="Button-model--create">
      Create
    </Button>
  </Link>
);

export type ModelReadListType = {
  Create: React.SFC<any>;
  List: React.SFC<any>;
  DeleteModal: React.SFC<any>;
};

const ModelListLayout = ({ Create, List, DeleteModal }: ModelReadListType) => (
  <section>
    <Create />
    <List />
    <DeleteModal />
  </section>
);

export default ModelListLayout;

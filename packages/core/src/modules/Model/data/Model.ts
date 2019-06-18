import gql from 'graphql-tag';
import { findIndex } from 'lodash';
import { QueryParams, RouteAction } from 'src/route/actions';
import {
  createModel,
  deleteModel,
  updateModel,
} from 'src/state/graphql/generated/mutations';
import { getModel, listModels } from 'src/state/graphql/generated/queries';

interface IModelRoute {
  name: string;
  pattern: string;
}

enum ModelQueries {
  LIST_MODELS = 'ListModels',
}

export default class Model {
  private static NAME = 'model';

  private static routes = [
    {
      action: RouteAction.INDEX,
      name: `${Model.NAME}.${RouteAction.INDEX}`,
      pattern: `/${Model.NAME}`,
    },
    {
      action: RouteAction.CREATE,
      name: `${Model.NAME}.${RouteAction.CREATE}`,
      pattern: `/${Model.NAME}?${QueryParams.ACTION}=${RouteAction.CREATE}`,
    },
  ];

  /**
   * GraphQL
   */
  public static get listModels() {
    return gql(listModels);
  }

  public static get getModel() {
    return gql(getModel);
  }

  public static get createModel() {
    return gql(createModel);
  }

  public static get updateModel() {
    return gql(updateModel);
  }

  public static get deleteModel() {
    return gql(deleteModel);
  }

  /**
   * Queries
   */
  public static get LIST_MODELS() {
    return ModelQueries.LIST_MODELS;
  }

  /**
   * Routes
   */
  public static get INDEX() {
    return Model.route(RouteAction.INDEX).name;
  }

  public static get CREATE() {
    return Model.route(RouteAction.INDEX).name;
  }

  public static get UPDATE() {
    return Model.route(RouteAction.INDEX).name;
  }

  // Model.route(RouteAction.INDEX).name
  public static route(action: RouteAction): IModelRoute {
    const index = findIndex(this.routes, { action });
    return this.routes[index];
  }
}

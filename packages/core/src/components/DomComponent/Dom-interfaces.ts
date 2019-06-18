import { IContainer } from 'src/components/Builder/Container';
import { IGrid } from 'src/components/Builder/Grid';
import {
  IComponent,
  IVariantInstance,
  Model,
} from 'src/components/Builder/interfaces';

export interface IPage {
  title: string;
  containers: [IContainer];

  [propName: string]: any;
}

export interface IElement {
  index: number;
  grid: Model<IGrid>;
  variantInstances: Model<IVariantInstance>[];
  type: string;
  component: Model<IComponent>;
  // [propName: string]: any;
}

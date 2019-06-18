import { IGrid } from 'src/components/Builder/Grid';
import { Model } from 'src/components/Builder/interfaces';

export interface IContainer {
  title: string;
  index: number;
  grids: Model<IGrid>[];
}

export class Container implements Model<IContainer> {
  id: string;
  title: string;
  index: number;
  grids: Model<IGrid>[];

  constructor({ id, title, index, grids }: Model<IContainer>) {
    this.id = id;
    this.title = title;
    this.index = index;
    this.grids = grids;
  }

  // static mapPages(pages: Model<IPage>[]) {
  //   return pages.map((page: Model<IPage>) => new Page(page));
  // }
}

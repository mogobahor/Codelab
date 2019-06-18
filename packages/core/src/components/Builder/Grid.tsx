import { Model } from 'src/components/Builder/interfaces';

export interface IGrid {
  id: string;
  index: number;
  name: string;
  // elements: [IElement];
  // grids?: [IGrid] | [];
}

export class Grid implements Model<IGrid> {
  id: string;
  name: string;
  index: number;

  constructor({ id, index, name }: Model<IGrid>) {
    this.id = id;
    this.index = index;
    this.name = name;
  }

  // static mapPages(pages: Model<IPage>[]) {
  //   return pages.map((page: Model<IPage>) => new Page(page));
  // }
}

// export interface IGrid extends IElementInput {
//   grids?: string[]; // Array of Grid ID's for flat data structure
//   elements?: IElement[];
//   name?: string;
//   // cols: number
// }

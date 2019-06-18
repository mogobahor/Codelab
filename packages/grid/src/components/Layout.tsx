import {
  mergeWith,
  map,
  flatten,
  flattenDeep,
  keyBy,
  forOwn,
  merge,
} from 'lodash';
import { isArray } from 'util';

// github.com/Microsoft/TypeScript/issues/5683
interface Grid {
  id: string;
  configs?: RglLayout;
}

type RglLayout = { [key in ScreenSize]?: Dimension[] };

type Dimension = {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

export enum ScreenSize {
  XXS = 'xxs',
  XS = 'xs',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
}

class Grid {
  id: string;
  configs?: Grid['configs'] = {};

  constructor(id: string) {
    this.id = id;
    // this.config = { i: id, x: 0, y: 0, w: 4, h: 2 };
  }

  setDimension(size: ScreenSize, x: number, y: number, w: number, h: number) {
    Object.assign(this.configs, {
      [size]: {
        x,
        y,
        w,
        h,
        i: this.id,
        static: true,
      },
    });
  }
}

class Layout {
  container: Grid[] = [];
  layouts = {};

  addGrid(grid: Grid) {
    this.container.push(grid);
  }

  /**
   * In format of react-grid-layout
   */
  getLayout() {
    // Loop each grid
    // grid -> build layout

    this.container.forEach(grid => {
      this.mapLayout(grid);
    });

    return this.layouts;
  }

  /**
   * Create react-grid-layout format from each grid
    {
      lg: [
        { i: 'a', x: 0, y: 0, w: 4, h: 2 },
      ],
      xxs: [
        { i: "c", x: 8, y: 0, w: 4, h: 2 },
      ],
    };
   */
  private mapLayout(grid: Grid) {
    const { configs } = grid;

    forOwn(configs, (val, key) => {
      /**
       * Add to layout
       */
      const customizer = (obj, src) => {
        if (isArray(obj)) {
          return obj.concat(src);
        }
      };

      this.layouts = mergeWith(this.layouts, { [key]: [val] }, customizer);
    });
  }
}

export { Layout, Grid };

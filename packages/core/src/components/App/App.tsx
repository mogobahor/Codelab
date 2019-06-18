import slugify from 'slugify';
import { Model } from 'src/components/Builder/interfaces';
import { IPage, Page } from 'src/components/Builder/Page/Page';

export interface IApp {
  name: string;
  slug: string;
  pages: Model<IPage>[];
}

export class App implements Model<IApp> {
  id: string;
  name: string;
  pages: Model<IPage>[];

  constructor({ id, name, pages }: Model<IApp>) {
    this.id = id;
    this.name = name;
    this.pages = Page.mapPages(pages);
  }

  static mapApps(apps: Model<IApp>[] = []) {
    return apps.map((app: Model<IApp>) => new App(app));
  }

  get slug() {
    return slugify(this.name, {
      replacement: '-',
      lower: true,
    });
  }
}

import { IContainer } from 'src/components/Builder/Container';
import { Model } from 'src/components/Builder/interfaces';

export interface IPage {
  title: string;
  containers: Model<IContainer>[];
}

export class Page implements Model<IPage> {
  containers: Model<IContainer>[];
  id: string;
  title: string;

  constructor({ id, title, containers }: Model<IPage>) {
    this.id = id;
    this.title = title;
    this.containers = containers;
  }

  static mapPages(pages: Model<IPage>[] = []) {
    return pages.map((page: Model<IPage>) => new Page(page));
  }
}

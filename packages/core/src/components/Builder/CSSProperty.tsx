import { ICSSProperty, Model } from 'src/components/Builder/interfaces';

export class CSSProperty implements Model<ICSSProperty> {
  public id: string;
  public name: string;
  public property: string;

  constructor({ id, name, property }: Model<ICSSProperty>) {
    this.id = id;
    this.name = name;
    this.property = property;
  }

  static mapCssProperties(
    values: Model<ICSSProperty>[],
  ): Model<ICSSProperty>[] {
    return values.map((value: Model<ICSSProperty>) => new CSSProperty(value));
  }
}

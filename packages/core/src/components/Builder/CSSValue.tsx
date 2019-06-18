import { ICSSValue, Model } from 'src/components/Builder/interfaces';

export class CSSValue implements Model<ICSSValue> {
  public id: string;
  public types: any;
  public value: string;

  constructor({ id, types, value }: Model<ICSSValue>) {
    this.id = id;
    this.types = types;
    this.value = value;
  }

  static mapCssOptions(values: Model<ICSSValue>[]): Model<ICSSValue>[] {
    return values.map((value: Model<ICSSValue>) => new CSSValue(value));
  }
}

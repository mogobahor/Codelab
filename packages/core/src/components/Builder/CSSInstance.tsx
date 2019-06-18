import { CSSProperty, CSSValue } from 'src/components/Builder';
import {
  ICSSInstance,
  ICSSTemplate,
  ICSSValue,
  ICSSProperty,
  Model,
} from 'src/components/Builder/interfaces';

export class CSSInstance implements ICSSInstance {
  public id: string;
  public option: Model<ICSSValue>;
  public property: Model<ICSSProperty>;

  constructor({ option, property }: Model<ICSSInstance>) {
    this.option = new CSSValue(option);
    this.property = new CSSProperty(property);
  }

  static mapCssInstances(
    cssInstances: Model<ICSSInstance>[],
  ): Model<ICSSInstance>[] {
    return cssInstances.map(
      (cssInstance: Model<ICSSInstance>) => new CSSInstance(cssInstance),
    );
  }
}

import { ISelectOption } from '@codelab/form/src/components/Input/Input--select';
import { CSSProperty } from 'src/components/Builder/CSSProperty';
import { CSSValue } from 'src/components/Builder/CSSValue';
import {
  ICSSProperty,
  ICSSTemplate,
  ICSSValue,
  Model,
} from 'src/components/Builder/interfaces';

export class CSSTemplate implements Model<ICSSTemplate> {
  public id: string;
  public name: string;
  public options: Model<ICSSValue>[];
  public property: Model<ICSSProperty>;

  constructor({ name, options, property }: Model<ICSSTemplate>) {
    this.name = name;
    this.options = CSSValue.mapCssOptions(options);
    this.property = new CSSProperty(property);
  }

  static mapCssTemplates(
    cssTemplates: Model<ICSSTemplate>[] = [],
  ): Model<ICSSTemplate>[] {
    return cssTemplates.map(
      (cssTemplate: Model<ICSSTemplate>) => new CSSTemplate(cssTemplate),
    );
  }

  public static getCssTemplatePropertyOptions(
    cssTemplates: Model<ICSSTemplate>[],
  ): ISelectOption[] {
    return cssTemplates.map((cssTemplate: Model<ICSSTemplate>) => ({
      label: cssTemplate.property.name,
      value: cssTemplate.property.id,
    }));
  }

  public static getCssTemplateOptionOptions(
    cssTemplates: Model<ICSSTemplate>[] = [],
  ): ISelectOption[] {
    return cssTemplates.map((cssTemplate: Model<ICSSTemplate>) => ({
      label: cssTemplate.property.name,
      value: cssTemplate.property.id,
    }));
  }
}

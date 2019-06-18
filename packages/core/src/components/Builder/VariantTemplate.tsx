import { ISelectOption } from '@codelab/form';
import {
  IVariant,
  IVariantTemplate,
  Model,
} from 'src/components/Builder/interfaces';
import { Variant } from 'src/components/Builder/Variant';

export class VariantTemplate implements Model<IVariantTemplate> {
  public id: string;
  public name: string;
  public variants: Model<IVariant>[];

  constructor({ id, name, variants }: Model<IVariantTemplate>) {
    this.id = id;
    this.name = name;
    this.variants = Variant.mapVariants(variants);
  }

  static mapTemplates(
    templates: Model<IVariantTemplate>[] = [],
  ): Model<IVariantTemplate>[] {
    return templates.map(
      (template: Model<IVariantTemplate>) => new VariantTemplate(template),
    );
  }

  public get variantOptions(): ISelectOption[] {
    return this.variants.map((variant: Model<IVariant>) => ({
      label: variant.name,
      value: variant.id,
    }));
  }
}

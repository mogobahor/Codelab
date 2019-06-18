import {
  IVariant,
  IVariantInstance,
  IVariantTemplate,
  Model,
} from 'src/components/Builder/interfaces';

class VariantInstance implements Model<IVariantInstance> {
  public id: string;
  public template: Model<IVariantTemplate>;
  public variant: Model<IVariant>;

  constructor({ id, template, variant }: Model<IVariantInstance>) {
    this.id = id;
    this.template = template;
    this.variant = variant;
  }

  public static mapVariantInstances(
    variantInstances: Model<IVariantInstance>[] = [],
  ) {
    return variantInstances.map((variantInstance: Model<IVariantInstance>) => {
      return new VariantInstance(variantInstance);
    });
  }
}

export default VariantInstance;

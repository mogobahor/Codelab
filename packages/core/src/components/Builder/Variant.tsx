import { Class } from 'src/components/Builder/Class';
import {
  IClass,
  IVariant,
  IVariantTemplate,
  Model,
} from 'src/components/Builder/interfaces';

import { GET_COMPONENTS } from 'src/components/Component/Component-queries';
import {
  CssClassWhereUniqueInput,
  MutationCreateVariantArgs,
} from 'src/graphql/__generated__/graphql-api';

export class Variant implements Model<IVariant> {
  public id: string;
  public name: string;
  public classes: Model<IClass>[];
  public variantCategory: Model<IVariantTemplate>;

  /**
   *
   * @param IVariant Default Param for empty constructor
   */
  constructor({ id, name, classes = [] }: Model<IVariant>) {
    this.id = id;
    this.name = name;
    this.classes = Class.mapClasses(classes);
  }

  static mapVariants(variants: Model<IVariant>[] = []): Model<IVariant>[] {
    return variants.map((variant: Model<IVariant>) => new Variant(variant));
  }

  static createVariant(values, { mutate }): Promise<any> {
    const { componentID } = values;
    const cssClasses: CssClassWhereUniqueInput[] = values.cssClasses.map(
      item => ({
        id: item.class,
      }),
    );

    const variables: MutationCreateVariantArgs = {
      data: {
        name: values.name,
        variantCategory: { connect: { id: values.category } },
        classes: { connect: cssClasses },
      },
    };

    return new Promise(resolve => {
      mutate({
        variables,
        refetchQueries: [
          {
            query: GET_COMPONENTS,
            variables: { id: componentID },
          },
        ],
      });
      resolve('Success');
    });
  }
}

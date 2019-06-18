import React from 'react';
import { IGrid } from 'src/components/Builder/Grid';
import {
  IComponent,
  IVariantInstance,
  Model,
} from 'src/components/Builder/interfaces';
import VariantInstance from 'src/components/Builder/VariantInstance';
import Component from 'src/components/Component/Component';
import { IElement } from 'src/components/DomComponent/Dom-interfaces';
import ElementItem from 'src/components/Element/Element-item';

/**
 * Create type that merges Entity logic with DB fields.
 */

export class Element implements Model<IElement> {
  grid: Model<IGrid>;
  id: string;
  index: number;
  type: string;
  variantInstances: Model<IVariantInstance>[];
  component: Model<IComponent>;

  constructor({ grid, id, index, type, variantInstances, component }) {
    this.grid = grid;
    this.id = id;
    this.index = index;
    this.type = type;
    this.component = new Component(component);
    this.variantInstances = VariantInstance.mapVariantInstances(
      variantInstances,
    );
  }

  public render() {
    return React.createElement(ElementItem, { key: this.id, element: this });
  }
}

export default Element;

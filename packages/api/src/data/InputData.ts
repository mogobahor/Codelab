import { DocType, ModelType } from 'src/app/controllers/api';
import { ASC, DESC, GREATERTHAN, LESSTHAN } from 'src/config/staticData';

const Create = 'create';
const Read = 'read';
const Update = 'update';
const Delete = 'delete';

interface IWhereUniqueInput {
  id: string;
}

type WhereFilter = {
  field: string;
  operator: typeof GREATERTHAN | typeof LESSTHAN;
  maxValue: number;
  minValue: number;
  value?: number;
};

type ReadSort = {
  field: string;
  operator: typeof ASC | typeof DESC;
};

export interface ICreateInput {
  action: typeof Create;
  data: ModelType[] | DocType[];
}

export interface IReadInput {
  action: typeof Read;
  model: string;
  fields?: string[];
  where?: WhereFilter[];
  sort?: ReadSort[];
}

export interface IUpdateInput {
  action: typeof Update;
  model: string;
  where: IWhereUniqueInput;
  data?: any;
}

export type DeleteInput = {
  action: typeof Delete;
  model: string;
  where: IWhereUniqueInput;
};

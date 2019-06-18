export type DeleteModel = {
  action: string;
  model: string;
  where: { id: string };
  childTable: string[];
};

export type DataDeletedResult = { n: number; ok: number };

export type UpdateModel = {
  action: string;
  model: string;
  where: {
    id: string;
  };
  data: {
    menu: string;
  };
};

export type ReadData = {
  action: string;
  model: string;
  where: {
    id: string;
  };
};

export type ReadDataFilter = {
  action: string;
  model: string;
  where: [Filter];
};

export type Filter = {
  field: string;
  operator: string;
  maxValue: number;
  minValue: number;
};

export type ReadDataSelectFields = {
  action: string;
  model: string;
  fields: [string];
};

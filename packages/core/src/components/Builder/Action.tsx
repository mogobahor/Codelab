import { Model } from 'src/components/Builder/interfaces';
import {
  GET_ACTIONS,
  INPUT_TYPES,
} from 'src/state/apollo-link-state/action/actionState';

export interface IAction {
  action: string;
}

export class Action implements Model<IAction> {
  public id: string;
  public action: string;

  constructor({ id, action }: Model<IAction>) {
    this.id = id;
    this.action = action;
  }

  static createAction(values, { mutate }): Promise<any> {
    return new Promise(resolve => {
      const variables = {
        actionCreateInput: {
          action: values.action,
        },
      };
      mutate({
        variables,
        refetchQueries: [
          {
            query: GET_ACTIONS,
          },
        ],
      }).then(() => {});
      resolve();
    });
  }

  public editAction(values, { mutate }): Promise<any> {
    return new Promise(resolve => {
      const variables = {
        actionUpdateInput: {
          action: values.action,
        },
        actionWhereUniqueInput: {
          id: this.id,
        },
      };
      mutate({
        variables,
        refetchQueries: [
          {
            query: GET_ACTIONS,
          },
        ],
      }).then(() => {});
      resolve();
    });
  }

  public deleteActionParameter() {
    return {
      variables: {
        actionWhereUniqueInput: {
          id: this.id,
        },
      },
      refetchQueries: [
        {
          query: GET_ACTIONS,
        },
      ],
    };
  }

  static getCreateFormFields() {
    const actionCreateFormFields = [
      {
        inputType: INPUT_TYPES.Text,
        name: 'action',
        placeholder: 'Input new action name',
        validation: [{ required: true, msg: 'Required!!' }],
      },
    ];
    return actionCreateFormFields;
  }

  public getEditFormFields() {
    const actionEditFormFields = [
      {
        inputType: INPUT_TYPES.Text,
        name: 'action',
        value: this.action,
        placeholder: 'Input new action name',
        validation: [{ required: true, msg: 'Required!!' }],
      },
    ];

    return actionEditFormFields;
  }

  static mapActions(actions: Model<IAction>[] = []): Model<IAction>[] {
    return actions.map((action: Model<IAction>) => new Action(action));
  }
}

export default Action;

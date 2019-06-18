import { Model } from 'src/components/Builder/interfaces';
import { IAction, Action } from 'src/components/Builder/Action';
import { IEvent, Event } from 'src/components/Builder/Event';
import { GET_WORKFLOWS } from 'src/state/apollo-link-state/action/actionState';

export interface IWorkflow {
  event: Model<IEvent>;
  action: Model<IAction>;
}

export class Workflow implements Model<IWorkflow> {
  public id: string;
  public event: Model<IEvent>;
  public action: Model<IAction>;
  constructor({ id, event, action }: Model<IWorkflow>) {
    this.id = id;
    this.event = new Event(event);
    this.action = new Action(action);
  }

  static createWorkflow(values, { mutate }): Promise<any> {
    return new Promise(resolve => {
      const variables = {
        workflowCreateInput: {
          status: 'PUBLISHED',
          event: { connect: { id: values.event } },
          action: { connect: { id: values.action } },
        },
      };
      mutate({
        variables,
        refetchQueries: [
          {
            query: GET_WORKFLOWS,
          },
        ],
      }).then(() => {});
      resolve();
    });
  }

  public getDeleteWorkflowParameter() {
    return {
      variables: {
        workflowWhereUniqueInput: {
          id: this.id,
        },
      },
      refetchQueries: [
        {
          query: GET_WORKFLOWS,
        },
      ],
    };
  }

  static mapWorkflows(workflows: Model<IWorkflow>[] = []): Model<IWorkflow>[] {
    return workflows.map(
      (workflow: Model<IWorkflow>) => new Workflow(workflow),
    );
  }
}

export default Workflow;

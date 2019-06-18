import { Model } from 'src/components/Builder/interfaces';
import {
  GET_EVENTS,
  INPUT_TYPES,
} from 'src/state/apollo-link-state/action/actionState';

export interface IEvent {
  name: string;
}

export class Event implements Model<IEvent> {
  public id: string;
  public name: string;

  constructor({ id, name }: Model<IEvent>) {
    this.id = id;
    this.name = name;
  }

  static createEvent(values, { mutate }): Promise<any> {
    return new Promise(resolve => {
      const variables = {
        eventCreateInput: {
          name: values.event,
        },
      };
      mutate({
        variables,
        refetchQueries: [
          {
            query: GET_EVENTS,
          },
        ],
      }).then(() => {});
      resolve();
    });
  }

  public editEvent(values, { mutate }): Promise<any> {
    return new Promise(resolve => {
      const variables = {
        eventUpdateInput: {
          name: values.event,
        },
        eventWhereUniqueInput: {
          id: this.id,
        },
      };
      mutate({
        variables,
        refetchQueries: [
          {
            query: GET_EVENTS,
          },
        ],
      }).then(() => {});
      resolve();
    });
  }

  public deleteEventParameter() {
    return {
      variables: {
        eventWhereUniqueInput: {
          id: this.id,
        },
      },
      refetchQueries: [
        {
          query: GET_EVENTS,
        },
      ],
    };
  }

  public getEditFormFields() {
    const eventEditFormFields = [
      {
        inputType: INPUT_TYPES.Text,
        name: 'event',
        value: this.name,
        placeholder: 'Input new event name',
        validation: [{ required: true, msg: 'Required!!' }],
      },
    ];

    return eventEditFormFields;
  }

  static getCreateFormFields() {
    const eventCreateFormFields = [
      {
        inputType: INPUT_TYPES.Text,
        name: 'event',
        placeholder: 'Input new event name',
        validation: [{ required: true, msg: 'Required!!' }],
      },
    ];
    return eventCreateFormFields;
  }

  static mapEvents(events: Model<IEvent>[] = []): Model<IEvent>[] {
    return events.map((event: Model<IEvent>) => new Event(event));
  }
}

export default Event;

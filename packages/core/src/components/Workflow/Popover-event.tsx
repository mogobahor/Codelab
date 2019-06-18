import { Form } from '@codelab/form';
import { Card, Col, Icon, Popover, Row } from 'antd';
import React from 'react';
import { Mutation } from 'react-apollo';
import { Event } from 'src/components/Builder/Event';
import { Models } from 'src/graphql/modelTypes';
import {
  ADD_EVENT,
  DELETE_EVENT,
  GET_EVENTS,
  UPDATE_EVENT,
} from 'src/state/apollo-link-state/action/actionState';
import Query from 'src/utils/Query';
import {
  boardStyle1,
  bodyStyle,
  crossStyle,
  settingStyle,
  textStyle,
} from './workflowStyle';

const EditPopoverContainer = ({ event }) => {
  const eventObj = new Event(event);
  const eventEditFields = eventObj.getEditFormFields();
  return (
    <Form
      fields={eventEditFields}
      mutation={UPDATE_EVENT}
      submitButton={{ text: 'Edit Event' }}
      onSubmit={(values, { mutate }) => eventObj.editEvent(values, { mutate })}
      onComplete={() => Promise.resolve(console.log('onComplete'))}
    />
  );
};

const EventModel = ({ event }) => {
  const eventObj = new Event(event);
  return (
    <Col span={12} style={boardStyle1}>
      <Card bodyStyle={bodyStyle}>
        <Mutation mutation={DELETE_EVENT}>
          {deleteEvent => (
            <Icon
              type="cross"
              style={crossStyle}
              onClick={() => {
                const param = eventObj.deleteEventParameter();
                deleteEvent(param);
              }}
            />
          )}
        </Mutation>
        <Popover
          placement="right"
          content={EditPopoverContainer({ event })}
          trigger="click"
        >
          <Icon type="setting" style={settingStyle} />
        </Popover>
        <h3 style={textStyle}>{event.name}</h3>
      </Card>
    </Col>
  );
};

const EventList = ({ events }) => {
  return events.map((event, idx) => <EventModel event={event} key={idx} />);
};

const AddEvent = () => {
  return (
    <Query<{ events: Event[] }> displayName={Models.Event} query={GET_EVENTS}>
      {({ data }) => {
        const events = data!.events;
        const eventCreateFormFields = Event.getCreateFormFields();
        return (
          <Row gutter={10}>
            <Form
              fields={eventCreateFormFields}
              mutation={ADD_EVENT}
              submitButton={{ text: 'New Event' }}
              onSubmit={(values, { mutate }) =>
                Event.createEvent(values, { mutate })
              }
              onComplete={() => Promise.resolve(console.log('onComplete'))}
            />
            <EventList events={events} />
          </Row>
        );
      }}
    </Query>
  );
};

export default AddEvent;

import { Form } from '@codelab/form';
import { Card, Col, Icon, Popover, Row } from 'antd';
import React from 'react';
import { Mutation } from 'react-apollo';
import { Action } from 'src/components/Builder/Action';
import {
  boardStyle1,
  bodyStyle,
  crossStyle,
  settingStyle,
  textStyle,
} from 'src/components/Workflow/workflowStyle';
import { Models } from 'src/graphql/modelTypes';
import {
  ADD_ACTION,
  DELETE_ACTION,
  GET_ACTIONS,
  UPDATE_ACTION,
} from 'src/state/apollo-link-state/action/actionState';
import Query from 'src/utils/Query';

const EditPopoverContainer = ({ action }) => {
  const actionObj = new Action(action);
  const actionEditFields = actionObj.getEditFormFields();

  return (
    <Form
      fields={actionEditFields}
      mutation={UPDATE_ACTION}
      submitButton={{ text: 'Edit Event' }}
      onSubmit={(values, { mutate }) =>
        actionObj.editAction(values, { mutate })
      }
      onComplete={() => Promise.resolve(console.log('onComplete'))}
    />
  );
};

const ActionModel = ({ action }) => {
  const actionObj = new Action(action);
  return (
    <Col span={12} style={boardStyle1}>
      <Card bodyStyle={bodyStyle}>
        <Mutation mutation={DELETE_ACTION}>
          {deleteAction => (
            <Icon
              type="cross"
              style={crossStyle}
              onClick={() => {
                const param = actionObj.deleteActionParameter();
                deleteAction(param);
              }}
            />
          )}
        </Mutation>
        <Popover
          placement="right"
          content={EditPopoverContainer({ action })}
          trigger="click"
        >
          <Icon type="setting" style={settingStyle} />
        </Popover>
        <h3 style={textStyle}>{action.action}</h3>
      </Card>
    </Col>
  );
};

const ActionList = ({ actions }) => {
  return actions.map((action, idx) => (
    <ActionModel action={action} key={idx} />
  ));
};

const AddAction = () => {
  return (
    <Query<{ actions: Action[] }>
      displayName={Models.Action}
      query={GET_ACTIONS}
    >
      {({ data }) => {
        const actions = data.actions;
        const actionCreateFormFields = Action.getCreateFormFields();
        return (
          <Row gutter={10}>
            <Form
              fields={actionCreateFormFields}
              mutation={ADD_ACTION}
              submitButton={{ text: 'New Action' }}
              onSubmit={(values, { mutate }) =>
                Action.createAction(values, { mutate })
              }
              onComplete={() => Promise.resolve(console.log('onComplete'))}
            />
            <ActionList actions={actions} />
          </Row>
        );
      }}
    </Query>
  );
};

export default AddAction;

import { Form } from '@codelab/form';
import { Card, Col, Icon } from 'antd';
import React from 'react';
import { Mutation } from 'react-apollo';
import { Models } from 'src/graphql/modelTypes';
import {
  ADD_WORKFLOW,
  DELETE_WORKFLOW,
  GET_WORKFLOWS,
} from 'src/state/apollo-link-state/action/actionState';
import Query from 'src/utils/Query';

const crossStyle: React.CSSProperties = {
  position: 'absolute',
  top: 2,
  right: 1,
  cursor: 'pointer',
};

const arrowStyle: React.CSSProperties = {
  textAlign: 'center',
  marginTop: 14,
  color: 'white',
};

const boardStyle: React.CSSProperties = {
  marginBottom: 10,
};

const bodyStyle: React.CSSProperties = {
  margin: -15,
};

const textStyle: React.CSSProperties = {
  textAlign: 'center',
};

const WorkflowTemplate = ({ workflow }) => {
  return (
    <section style={{ padding: 15 }}>
      <Col span={10} style={boardStyle}>
        <Card bodyStyle={bodyStyle}>
          <Mutation mutation={DELETE_WORKFLOW}>
            {deleteWorkflow => (
              <Icon
                type="cross"
                style={crossStyle}
                onClick={() => {
                  deleteWorkflow({
                    variables: {
                      id: workflow.id,
                    },
                    refetchQueries: [
                      {
                        query: GET_WORKFLOWS,
                      },
                    ],
                  });
                }}
              />
            )}
          </Mutation>
          <h3 style={textStyle}>{workflow.event.name}</h3>
        </Card>
      </Col>
      <Col span={4} style={arrowStyle}>
        <span> ==> </span>
      </Col>
      <Col span={10} style={boardStyle}>
        <Card bodyStyle={bodyStyle}>
          <h3 style={textStyle}>{workflow.action[0].action}</h3>
        </Card>
      </Col>
    </section>
  );
};

const WorkflowList = ({ workflows }) => {
  return workflows.map((workflow, idx) => (
    <WorkflowTemplate workflow={workflow} key={idx} />
  ));
};

const AddWorkflow = () => {
  return (
    <Query displayName={Models.WorkflowAndOptions} query={GET_WORKFLOWS}>
      {({ data, refetch }) => {
        const workflowTemplate = data.workflowTemplate;
        const workflowInputFields = workflowTemplate.getWorkflowInputFields();
        const workflows = workflowTemplate.getWorkflows();
        return (
          <>
            <Form
              fields={workflowInputFields}
              mutation={ADD_WORKFLOW}
              submitButton={{ text: 'Add Action' }}
              onSubmit={(values, { mutate }) => {
                return new Promise(resolve => {
                  const variables = {
                    event_id: values.event,
                    action_id: values.action,
                  };
                  mutate({
                    variables,
                  }).then(() => {
                    refetch();
                  });
                  resolve();
                });
              }}
              onComplete={() => Promise.resolve(console.log('onComplete'))}
            />
            <WorkflowList workflows={workflows} />
          </>
        );
      }}
    </Query>
  );
};

export default AddWorkflow;

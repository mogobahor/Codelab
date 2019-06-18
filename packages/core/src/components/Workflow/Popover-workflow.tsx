import { Form } from '@codelab/form';
import { Card, Col, Icon, Row } from 'antd';
import React from 'react';
import { Mutation } from 'react-apollo';
import { Workflow } from 'src/components/Builder/Workflow';
import { WorkflowTemplate } from 'src/components/Builder/WorkflowTemplate';
import { Models } from 'src/graphql/modelTypes';
import {
  ADD_WORKFLOW,
  DELETE_WORKFLOW,
  GET_WORKFLOWS,
  GET_WORKFLOWTEMPLATES,
} from 'src/state/apollo-link-state/action/actionState';
import Query from 'src/utils/Query';
import {
  arrowStyle,
  boardStyle2,
  bodyStyle,
  crossStyle,
  textStyle,
} from './workflowStyle';

const WorkflowModel = ({ workflow }) => {
  const workflowObj = new Workflow(workflow);
  return (
    <section>
      <Col span={11} style={boardStyle2}>
        <Card bodyStyle={bodyStyle}>
          <Mutation mutation={DELETE_WORKFLOW}>
            {deleteWorkflow => (
              <Icon
                type="cross"
                style={crossStyle}
                onClick={() => {
                  const param = workflowObj.getDeleteWorkflowParameter();
                  deleteWorkflow(param);
                }}
              />
            )}
          </Mutation>
          <h3 style={textStyle}>{workflow.event.name}</h3>
        </Card>
      </Col>
      <Col span={2} style={arrowStyle}>
        <span> ==> </span>
      </Col>
      <Col span={11} style={boardStyle2}>
        <Card bodyStyle={bodyStyle}>
          <h3 style={textStyle}>{workflow.action.action}</h3>
        </Card>
      </Col>
    </section>
  );
};

const WorkflowList = ({ workflows }) => {
  return workflows.map((workflow, idx) => (
    <WorkflowModel workflow={workflow} key={idx} />
  ));
};

const AddWorkflow = () => {
  return (
    <>
      <Query<{ workflowTemplate: WorkflowTemplate }>
        displayName={Models.WorkflowTemplate}
        query={GET_WORKFLOWTEMPLATES}
      >
        {({ data }) => {
          const workflowTemplate = data!.workflowTemplate;
          const workflowFormFields = workflowTemplate.getWorkflowFormFields();
          return (
            <Row gutter={10}>
              <Form
                fields={workflowFormFields}
                mutation={ADD_WORKFLOW}
                submitButton={{ text: 'Add Workflow' }}
                onSubmit={(values, { mutate }) =>
                  Workflow.createWorkflow(values, { mutate })
                }
                onComplete={() => Promise.resolve(console.log('onComplete'))}
              />
            </Row>
          );
        }}
      </Query>

      <Query<{ workflows: Workflow[] }>
        displayName={Models.Workflow}
        query={GET_WORKFLOWS}
      >
        {({ data }) => {
          const workflows = data!.workflows;
          return <WorkflowList workflows={workflows} />;
        }}
      </Query>
    </>
  );
};

export default AddWorkflow;

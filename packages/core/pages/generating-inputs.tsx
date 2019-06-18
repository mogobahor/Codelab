import React from 'react';
import withPageProps from 'src/hoc/withPageProps';
import Query from 'src/utils/Query';
import { GET_INPUTS } from 'src/state/apollo-link-state/dynamic-form/dynamicFormState';
import { Form } from '@codelab/form';
import { Row, Col, Button } from 'antd';
import styled from 'styled-components';
import { Mutation } from 'react-apollo';
import { DELETE_INPUT } from '../src/state/apollo-link-state/dynamic-form/dynamicFormState';
const Breaker = styled.div.attrs({})`
  min-height: 1.5rem;
`;
const Inputs = () => (
  <Query query={GET_INPUTS}>
    {({ inputs }) => {
      return (
        <>
          <Form fields={inputs} mode="renderProps">
            {({
              FormWrapper,
              FormFields,
              Fields,
              FormButton,
              formController,
            }) => {
              return (
                <FormWrapper>
                  <Row gutter={10}>
                    <Col span={12}>
                      <FormFields
                        Fields={Fields}
                        className={formController.className}
                      />
                    </Col>

                    <Col span={6}>
                      <Mutation mutation={DELETE_INPUT}>
                        {deleteInput => {
                          return (
                            <>
                              {inputs.map(({ name }, index) => {
                                return (
                                  <Row key={index}>
                                    <Button
                                      type="primary"
                                      block
                                      icon="close"
                                      style={{ marginBottom: '1rem' }}
                                      onClick={() =>
                                        deleteInput({ variables: { name } })
                                      }
                                    >
                                      Delete
                                    </Button>
                                  </Row>
                                );
                              })}
                            </>
                          );
                        }}
                      </Mutation>
                    </Col>
                  </Row>
                </FormWrapper>
              );
            }}
          </Form>
        </>
      );
    }}
  </Query>
);

const ExamplePage = props => {
  return <Inputs />;
};
export default withPageProps({ hasSidebar: true })(ExamplePage);

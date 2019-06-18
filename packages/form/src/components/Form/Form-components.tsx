import { Button, Col, Form, Row } from 'antd';
import React from 'react';
import { IFormWrapperProps } from 'src/components/Form/Form--interface';
import ThemeProvider from 'src/components/ThemeProvider';
import styled from 'styled-components';

const StyledFormWrapper = styled.section`
  // margin: ${props => props.theme.padding.md};
`;

const StyledForm = styled(props => (
  <StyledFormWrapper>
    <Form onSubmit={props.onSubmit} {...props} />
  </StyledFormWrapper>
))``;
// margin: ${props => props.theme.padding.md};

const FormWrapper = ({ onSubmit, ...props }: IFormWrapperProps) => {
  return (
    <ThemeProvider>
      <StyledForm onSubmit={onSubmit} {...props} />
    </ThemeProvider>
  );
};

const FormFields = ({ Fields, children, gutter }) => {
  return (
    <ThemeProvider>
      <Row gutter={gutter || 10}>
        {Fields}
        {children}
      </Row>
    </ThemeProvider>
  );
};

const FormButton = ({
  isSubmitting,
  handleSubmit,
  tailFormItemLayout,
  layout,
  ...props
}: any) => {
  return (
    <Row>
      <Col {...layout} span={12}>
        <ThemeProvider>
          {/* isValid doesn't work with initialValues, we won't disable button based on isValid */}
          <Button
            {...props}
            type="primary"
            htmlType="submit"
            disabled={isSubmitting}
            onClick={handleSubmit}
          >
            {isSubmitting ? 'Loading' : props.children || 'Submit'}
          </Button>
        </ThemeProvider>
      </Col>
    </Row>
  );
};

export { FormWrapper, FormFields, FormButton };

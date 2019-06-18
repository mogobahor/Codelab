import { Card, Col, Icon, Popover, Row } from 'antd';
import React, { useState } from 'react';
import Component from 'src/components/Component/Component';
import { GET_COMPONENTS } from 'src/components/Component/Component-queries';
import CreateClass from 'src/components/Variants/Popover-createClass';
import CreateVariant from 'src/components/Variants/Popover-createVariant';
import SelectVariant from 'src/components/Variants/Popover-selectVariant';
import { ModelList } from 'src/graphql/modelTypes';
import { VariantSteps } from 'src/state/apollo-link-state/variant/variantState';
import Query from 'src/utils/Query';

const gridStyle = {
  width: '100%',
  cursor: 'pointer',
  marginBottom: 8,
};

interface IPopoverContainerProps {
  currentStep: string;
  setCurrentStep: any;
  component: any;
}

const PopoverContainer: React.FC<IPopoverContainerProps> = ({
  currentStep,
  setCurrentStep,
  component,
}) => {
  switch (currentStep) {
    case VariantSteps.SelectVariant:
      return (
        <SelectVariant setCurrentStep={setCurrentStep} component={component} />
      );

    case VariantSteps.CreateVariant:
      return (
        <CreateVariant setCurrentStep={setCurrentStep} component={component} />
      );

    case VariantSteps.CreateClass:
      return <CreateClass setCurrentStep={setCurrentStep} />;

    default:
      return null;
  }
};

const ComponentTemplate = ({ component }) => {
  const [currentStep, setCurrentStep] = useState(VariantSteps.SelectVariant);
  return (
    <Card
      style={gridStyle}
      className="Component"
      hoverable={true}
      headStyle={{ border: 0 }}
      bodyStyle={{ marginTop: -32 }}
      extra={
        <Popover
          placement="right"
          content={PopoverContainer({
            currentStep,
            setCurrentStep,
            component,
          })}
          trigger="click"
        >
          <Icon type="setting" />
        </Popover>
      }
    >
      <h3 style={{ textAlign: 'center' }}>{component.type}</h3>
    </Card>
  );
};

const TabComponents = () => {
  const mappedComponents = ({ data: { components } }: any) =>
    components.map((component, idx) => (
      <Col span={12} key={idx}>
        <ComponentTemplate component={component} />
      </Col>
    ));

  return (
    <section>
      <Row gutter={8}>
        <Query<{ components: Component[] }>
          query={GET_COMPONENTS}
          displayName={ModelList.Components}
        >
          {mappedComponents}
        </Query>
      </Row>
    </section>
  );
};

export default TabComponents;

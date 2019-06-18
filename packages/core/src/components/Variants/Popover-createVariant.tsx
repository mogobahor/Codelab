import { Form } from '@codelab/form';
import { Card, Icon } from 'antd';
import React from 'react';
import { Class, Variant } from 'src/components/Builder';
import {
  CREATE_VARIANT,
  GET_CSS_CLASSES,
} from 'src/components/Component/Component-queries';
import { ModelList } from 'src/graphql/modelTypes';
import { VariantSteps } from 'src/state/apollo-link-state/variant/variantState';
import Query from 'src/utils/Query';

const CreateVariant = ({ setCurrentStep, component }) => {
  return (
    <Query<{ cssClasses: Class[] }>
      query={GET_CSS_CLASSES}
      displayName={ModelList.CSSClasses}
    >
      {({ data }) => {
        const { cssClasses } = data!;
        const variantFields = component.variantFormFields(cssClasses);

        return (
          <Card
            title={
              <>
                <a
                  href="javascript:;"
                  style={{ display: 'block', float: 'left' }}
                  onClick={() => {
                    setCurrentStep(VariantSteps.SelectVariant);
                  }}
                >
                  <Icon type="left" />
                  <span> Create a Variant</span>
                </a>
                <a
                  href="javascript:;"
                  style={{ display: 'block', float: 'right' }}
                  onClick={() => {
                    setCurrentStep(VariantSteps.CreateClass);
                  }}
                >
                  <Icon type="plus" />
                </a>
              </>
            }
            bordered={false}
          >
            <Form
              mutation={CREATE_VARIANT}
              fields={variantFields}
              onSubmit={(values, { mutate }) => {
                return Variant.createVariant(values, { mutate });
              }}
            />
          </Card>
        );
      }}
    </Query>
  );
};

export default CreateVariant;

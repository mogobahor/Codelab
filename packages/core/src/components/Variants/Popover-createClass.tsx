import { Form } from '@codelab/form';
import { Card, Icon } from 'antd';
import React from 'react';
import { Class } from 'src/components/Builder';
import { ICSSTemplate, Model } from 'src/components/Builder/interfaces';
import Component from 'src/components/Component/Component';
import {
  CREATE_CSS_CLASS,
  GET_CSS_TEMPLATES,
} from 'src/components/Component/Component-queries';
import { ModelList } from 'src/graphql/modelTypes';
import { VariantSteps } from 'src/state/apollo-link-state/variant/variantState';
import Query from 'src/utils/Query';

const CreateClass = ({ setCurrentStep }) => {
  return (
    <Query<{ component: Component; cssTemplates: Model<ICSSTemplate>[] }>
      query={GET_CSS_TEMPLATES}
      displayName={ModelList.CSSTemplates}
    >
      {({ data }) => {
        const { cssTemplates } = data!;
        const classFields = Component.classCreateFormFields(cssTemplates);
        return (
          <Card
            title={
              <a
                href="javascript:;"
                style={{ display: 'block' }}
                onClick={() => {
                  setCurrentStep(VariantSteps.CreateVariant);
                }}
              >
                <Icon type="left" />
                <span> Create a Class</span>
              </a>
            }
            bordered={false}
            style={{ width: '360px' }}
          >
            <Form
              fields={classFields}
              mutation={CREATE_CSS_CLASS}
              onSubmit={(values, { mutate }) => {
                return Class.createClass(values, { mutate });
              }}
            />
          </Card>
        );
      }}
    </Query>
  );
};

export default CreateClass;

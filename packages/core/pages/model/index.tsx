import { ModelPageCreate } from 'pages/model/create';
import { ModelUpdatePage } from 'pages/model/update';
import React from 'react';
import { Mutation } from 'react-apollo';
import { Compose, Toggle, Value } from 'react-powerplug';
import withPageProps from 'src/hoc/withPageProps';
import ModelDeleteButton from 'src/modules/Model/components/Model-delete--button';
import ModelDeleteModal from 'src/modules/Model/components/Model-delete--modal';
import ModelListLayout, {
  ModelCreateButton,
  ModelDetailLink,
  ModelEditLink,
  ModelList,
} from 'src/modules/Model/components/Model-list--layout';
import { deleteMutation } from 'src/modules/Model/data/Model-container';
import Query from 'src/utils/Query';
import Model from '../../src/modules/Model/data/Model';

const ComposePowerPlug: any = Compose;
const ValuePowerPlug: any = Value;

const List = ({ data, toggle, set }) => (
  <ModelList models={data.listModels.items}>
    {model => {
      return (
        <>
          <ModelDetailLink model={model} />
          <ModelEditLink model={model} />
          <ModelDeleteButton
            onDelete={() => {
              set(model.id);
              toggle.toggle();
            }}
          />
        </>
      );
    }}
  </ModelList>
);

const ModelIndex = props => {
  return (
    <>
      {/* <ModalUserRegister visible={value} /> */}
      <ModelPageCreate {...props} />
      <ModelUpdatePage {...props} />
      {/* <SidebarCreateLayout /> */}

      <Query query={Model.listModels}>
        {data => (
          <ComposePowerPlug
            components={[Toggle, <ValuePowerPlug initial={0} />]}
          >
            {(toggle, { value, set }) => (
              // Layout for the model list
              <ModelListLayout
                Create={ModelCreateButton}
                List={() => <List toggle={toggle} data={data} set={set} />}
                DeleteModal={() => (
                  <Mutation
                    mutation={Model.deleteModel}
                    awaitRefetchQueries={true}
                  >
                    {(deleteModel, { data }) => (
                      <ModelDeleteModal
                        handleOk={() => deleteMutation(deleteModel, value)}
                        handleCancel={toggle.toggle}
                        visible={toggle.on}
                      />
                    )}
                  </Mutation>
                )}
              />
            )}
          </ComposePowerPlug>
        )}
      </Query>
    </>
  );
};

export default withPageProps()(ModelIndex);

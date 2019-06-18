import React from 'react';
import { adopt } from 'react-adopt';
import { Mutation } from 'react-apollo';
import Icon from 'src/components/Icon';
import {
  ELEMENT_DELETE_MUTATION,
  ELEMENT_UPDATE_MUTATION,
} from 'src/components/Element/Element-mutation--delete';
import {
  MutationDeleteElementArgs,
  MutationUpdateElementArgs,
} from 'src/graphql/__generated__/graphcmsTypes';

const updateElement = ({ render }) => (
  <Mutation mutation={ELEMENT_UPDATE_MUTATION}>
    {(mutation, result) => render({ mutation, result })}
  </Mutation>
);

const deleteElement = ({ render }) => (
  <Mutation mutation={ELEMENT_DELETE_MUTATION} refetchQueries={['elements']}>
    {(mutation, result) => render({ mutation, result })}
  </Mutation>
);

const ComposedMutations = adopt({
  updateElement,
  deleteElement,
});

const ElementItem = ({ element }) => {
  const variantInstancesID = element.variantInstances.map(instance => ({
    id: instance.id,
  }));

  const updateElementVariables: MutationUpdateElementArgs = {
    data: {
      variantInstances: {
        delete: variantInstancesID,
      },
    },
    where: {
      id: element.id,
    },
  };

  const deleteElementVariables: MutationDeleteElementArgs = {
    where: {
      id: element.id,
    },
  };

  return (
    <article>
      <h4>
        {element.component.type}
        &nbsp;
        <ComposedMutations>
          {({ updateElement, deleteElement }) => {
            return (
              <a
                onClick={() => {
                  updateElement.mutation({ variables: updateElementVariables });
                  deleteElement.mutation({ variables: deleteElementVariables });
                }}
              >
                <Icon icon="times" />
              </a>
            );
          }}
        </ComposedMutations>
      </h4>
      <h5>Element ID </h5>
      <p>{element.id}</p>
      <h5>Variant Instances </h5>
      {element.variantInstances.map(instance => (
        <p key={instance.id}>{instance.id}</p>
      ))}
      <hr />
    </article>
  );
};

export default ElementItem;

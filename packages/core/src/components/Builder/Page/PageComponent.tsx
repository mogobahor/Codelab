import React from 'react';
import { ElementFactory } from 'src/components/Builder/ElementFactory';
import { PageFragmentFragment } from 'src/graphql/__generated__/graphcmsTypes';
import { ComponentTypes } from 'src/graphql/modelTypes';
import styled from 'styled-components';

const PageStyle = styled.div`
  border: 1px dashed black;
  min-height: 300px;
  position: relative;
`;

export const Page = ({
  page,
  mode,
  children,
}: {
  page: PageFragmentFragment;
  mode: string;
  children?: any;
}) => {
  const { containers } = page;
  console.log(containers);
  // containers.pop();

  return (
    <PageStyle>
      {page.title}
      <Elements elements={containers} />
    </PageStyle>
  );
};
const Elements = ({ elements }) =>
  elements.map(element => {
    const { id, __typename, index, ...props } = element;
    const type = ComponentTypes[__typename as string];
    return (
      <ElementFactory
        key={index.toString()}
        type={type}
        index={index}
        order={index}
        {...props}
      >
        {Elements}
      </ElementFactory>
    );
  });

export default Page;

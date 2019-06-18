import React from 'react';
import { Collapse } from 'antd';
import { Form } from '@codelab/form';
import styled from 'styled-components';

const Panel = Collapse.Panel;

const PanelHeader = styled.h5`
  color: white;
`;

const customPanelStyle = {
  // background: 'rgba(19,3,51,0.9)',
  border: 0,
};

const menus: any[] = [
  {
    title: 'Settings',
    inputs: [
      {
        name: 'id',
        placeholder: 'Id',
        inputType: 'text',
        value: '',
        col: 12,
        validation: [],
      },
      {
        name: 'title',
        placeholder: 'Title',
        inputType: 'text',
        value: '',
        col: 12,
        validation: [],
      },
    ],
  },
  {
    title: 'General',
    inputs: [
      {
        name: 'alignment',
        inputType: 'radio',
        col: 24,
        options: [
          {
            label: 'center',
            value: 'center',
          },
          {
            label: 'left',
            value: 'left',
          },
          {
            label: 'right',
            value: 'right',
          },
        ],
      },
      {
        name: 'display',
        inputType: 'select',
        label: 'Display',
        defaultValue: 'block',
        col: 12,
        options: [
          {
            label: 'block',
            value: 'block',
          },
          {
            label: 'inline-block',
            value: 'inline-block',
          },
          {
            label: 'flex',
            value: 'flex',
          },
          {
            label: 'none',
            value: 'none',
          },
        ],
      },
      {
        name: 'position',
        inputType: 'select',
        label: 'Position',
        defaultValue: 'static',
        col: 12,
        options: [
          {
            label: 'static',
            value: 'static',
          },
          {
            label: 'relative',
            value: 'relative',
          },
          {
            label: 'absolute',
            value: 'absolute',
          },
          {
            label: 'fixed',
            value: 'fixed',
          },
        ],
      },
      {
        name: 'top',
        inputType: 'number',
        placeholder: 'Top',
        col: 12,
      },
      {
        name: 'right',
        inputType: 'number',
        placeholder: 'Right',
        col: 12,
      },
      {
        name: 'left',
        inputType: 'number',
        placeholder: 'Left',
        col: 12,
      },
      {
        name: 'botom',
        inputType: 'number',
        placeholder: 'Bottom',
        col: 12,
      },
    ],
  },
  {
    title: 'Dimension',
    menus: [
      {
        title: 'Size',
        inputs: [
          {
            name: 'width',
            inputType: 'number',
            placeholder: 'width',
            col: 12,
          },
          {
            name: 'height',
            inputType: 'number',
            placeholder: 'height',
            col: 12,
          },
          {
            name: 'maxWidth',
            inputType: 'number',
            placeholder: 'MaxWidth',
            col: 12,
          },
          {
            name: 'maxHeight',
            inputType: 'number',
            placeholder: 'MaxHeight',
            col: 12,
          },
        ],
      },
      {
        title: 'Padding',
        inputs: [
          {
            name: 'p-top',
            inputType: 'number',
            placeholder: 'top',
            col: 12,
          },
          {
            name: 'p-right',
            inputType: 'number',
            placeholder: 'right',
            col: 12,
          },
          {
            name: 'p-bottom',
            inputType: 'number',
            placeholder: 'bottom',
            col: 12,
          },
          {
            name: 'p-left',
            inputType: 'number',
            placeholder: 'left',
            col: 12,
          },
        ],
      },
      {
        title: 'Margin',
        inputs: [
          {
            name: 'm-top',
            inputType: 'number',
            placeholder: 'top',
            col: 12,
          },
          {
            name: 'm-right',
            inputType: 'number',
            placeholder: 'right',
            col: 12,
          },
          {
            name: 'm-bottom',
            inputType: 'number',
            placeholder: 'bottom',
            col: 12,
          },
          {
            name: 'm-left',
            inputType: 'number',
            placeholder: 'left',
            col: 12,
          },
        ],
      },
    ],
  },
  {
    title: 'Typography',
    inputs: [
      {
        name: 'font',
        inputType: 'select',
        label: 'Font',
        options: [
          {
            label: 'Helvitica',
            value: 'Helvitica',
          },
          {
            label: 'Arial',
            value: 'Arial',
          },
          {
            label: 'Geogra',
            value: 'Geogra',
          },
        ],
        col: 12,
      },
      {
        name: 'font-size',
        inputType: 'number',
        col: 12,
        label: 'Font Size',
      },
      {
        name: 'weight',
        inputType: 'select',
        label: 'Font Weight',
        col: 12,
        options: [
          {
            label: 'Thin',
            value: 'thin',
          },
          {
            label: 'Light',
            value: 'light',
          },
          {
            label: 'Medium',
            value: 'medium',
          },
          {
            label: 'Bold',
            value: 'Bold',
          },
        ],
      },
      {
        name: 'letter-spacing',
        inputType: 'number',
        label: 'Letter Spacing',
        col: 12,
      },
      {
        name: 'font-color',
        inputType: 'color',
        label: 'Font-color',
        value: '#fff',
        col: 24,
      },
      {
        name: 'line-height',
        inputType: 'text',
        label: 'Line-Height',
        options: [],
        col: 24,
      },
      {
        name: 'text-align',
        inputType: 'radio',
        label: 'Text Align',
        options: [
          {
            label: 'left',
            value: 'left',
          },
          {
            label: 'right',
            value: 'right',
          },
          {
            label: 'center',
            value: 'center',
          },
          {
            label: 'justify',
            value: 'justify',
          },
        ],
        col: 24,
      },
      {
        name: 'text-decoration',
        inputType: 'radio',
        label: 'Text Decoration',
        options: [
          {
            label: 'none',
            value: 'none',
          },
          {
            label: 'underline',
            value: 'underline',
          },
          {
            label: 'line-through',
            value: 'line-through',
          },
        ],
      },
    ],
    menus: [
      {
        title: 'Text-Shadow',
        inputs: [
          {
            name: 'x-position',
            inputType: 'number',
            label: 'X Position',
            col: 12,
          },
          {
            name: 'y-position',
            inputType: 'number',
            label: 'Y Position',
            col: 12,
          },
          {
            name: 'blur',
            inputType: 'number',
            label: 'blur',
            col: 24,
          },
          {
            name: 'color',
            inputType: 'color',
            label: 'color',
            value: '#ffffff',
            col: 24,
          },
        ],
      },
    ],
  },
  {
    title: 'Decorations',
    inputs: [
      {
        name: 'opacity',
        inputType: 'slider',
        label: 'Opacity',
        min: 0,
        max: 1,
        defaultValue: 1,
        step: 0.1,
      },
      {
        name: 'background-color',
        inputType: 'color',
        label: 'Background Color',
        value: '#ffffff',
      },
    ],
    menus: [
      {
        title: 'Border radius',
        inputs: [
          {
            name: 'bdr-top',
            inputType: 'number',
            label: 'Top',
            value: 0,
            col: 12,
          },
          {
            name: 'bdr-left',
            inputType: 'number',
            label: 'Left',
            value: 0,
            col: 12,
          },
          {
            name: 'bdr-bottom',
            inputType: 'number',
            label: 'Bottom',
            value: 0,
            col: 12,
          },
          {
            name: 'bdr-right',
            inputType: 'number',
            label: 'Right',
            value: 0,
            col: 12,
          },
        ],
      },
      {
        title: 'Border',
        inputs: [
          {
            name: 'bd-with',
            inputType: 'number',
            label: 'Width',
            value: 0,
            col: 12,
          },
          {
            name: 'bd-style',
            inputType: 'number',
            label: 'Style',
            value: 0,
            col: 12,
          },
          {
            name: 'bd-color',
            inputType: 'color',
            label: 'Border Color',
            value: '#000000',
          },
        ],
      },
    ],
  },
  {
    title: 'Flex',
    inputs: [
      {
        name: 'flex-container',
        inputType: 'select',
        options: [
          {
            label: 'Enable',
            value: 'enable',
          },
          {
            label: 'Disable',
            value: 'disable',
          },
        ],
      },
    ],
  },
];

const Menu = ({ menu }) => {
  return (
    <>
      <p>{menu.title}</p>
      <Form mode="renderProps" fields={menu.inputs || []}>
        {({ FormWrapper, FormFields, Fields, formController }) => {
          return (
            <FormWrapper>
              <FormFields
                Fields={Fields}
                className={formController.className}
              />
            </FormWrapper>
          );
        }}
      </Form>
    </>
  );
};

const TabStyle = () => {
  return (
    <Collapse bordered={false} defaultActiveKey={['1']}>
      {menus.map((menu, index) => (
        <Panel header={menu.title} key={index} style={customPanelStyle}>
          {Array.isArray(menu.menus) && (
            <>
              {menu.menus.map((subMenu, index) => (
                <Menu key={index} menu={subMenu} />
              ))}
            </>
          )}
          <Menu menu={menu} />
        </Panel>
      ))}
    </Collapse>
  );
};

export default TabStyle;

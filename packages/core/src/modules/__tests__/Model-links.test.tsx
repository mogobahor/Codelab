import { shallow } from 'enzyme';
import React from 'react';
import { ModelCreateButton } from '../Model/components/Model-list--layout';
import Model from '../Model/data/Model';

describe('A create button for Model', () => {
  it('contains the correct route', () => {
    const CreateButton = shallow(<ModelCreateButton />);

    expect(CreateButton.prop('route')).toEqual(Model.CREATE);
  });

  // it('displays the correct button text', () => {
  //   const CreateButton = mount(
  //     <RouterMock>
  //       <ModelCreateButton />
  //     </RouterMock>,
  //   );
  //   // console.log(CreateButton.find(Button).debug());
  //
  //   expect(CreateButton.find(Button).text()).toEqual('Create');
  // });

  // it('displays the create modal with query params "?action=create"', () => {
  // const wrapper = shallow(<ModelCreateModal />);
  // // console.log(wrapper.debug());
  // console.log(
  //   wrapper
  //     .find(ModelPageCreate)
  //     .dive()
  //     .debug(),
  // );
  // });

  // it('displays loading state for delete button on click', () => {

  // })
});

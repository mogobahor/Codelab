// const ModelListWithData = compose(withModelList)(ModelListWithHandlers);

beforeEach(() => {});

// const MockRouter = withMockRouterContext([mockedRouter]);

describe('With Enzyme', () => {
  it('is true', () => {
    expect(true).toEqual(true);
  });

  /**
   * beforeEach setup
   */
  // const customResolvers = mocks({
  //   model: 5,
  //   field: 2,
  // });
  // const wrapper = mount(
  //   <ApolloMockingProvider customResolvers={customResolvers}>
  //     <MockRouter>{/* <ModelListWithData /> */}</MockRouter>
  //   </ApolloMockingProvider>,
  // );
  // beforeEach(async () => {
  //   await new Promise(resolve => setTimeout(resolve));
  //   wrapper.update();
  // });
  //
  // /**
  //  * Read
  //  */
  // // it('renders a list of models', () => {
  // //   expect(wrapper.find(ModelListWithData).find('li')).toHaveLength(5);
  // // });
  //
  // /**
  //  * Create
  //  */
  // it('renders a "Create" button & redirects to the create page', () => {
  //   const CreateButton = wrapper.find('button.Button-model--create');
  //   const CreateButtonLink = CreateButton.closest('Link');
  //   const linkUrl = CreateButtonLink.prop('as');
  //
  //   expect(CreateButton.text()).toEqual('Create');
  //   expect(linkUrl).toEqual('/model/create');
  // });
  //
  // /**
  //  * Delete
  //  */
  // it('renders a "Delete" button & opens a delete confirmation modal', () => {
  //   const DeleteButton = wrapper.find('button.Button-model--delete').first();
  //   const onDeleteHandler = jest.fn();
  //
  //   DeleteButton.simulate('click');
  //   expect(onDeleteHandler).toBeCalled();
  //
  //   // expect(DeleteButton.text()).toEqual('Delete');
  // });
});

// describe('With Snapshot Testing', () => {
//   it('App shows "Hello world!"', () => {
//     const component = renderer.create(<ModelList />);
//     const tree = component.toJSON();
//     expect(tree).toMatchSnapshot();
//   });
// );

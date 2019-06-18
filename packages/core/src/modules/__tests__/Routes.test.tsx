// jest.mock('src/route/Router'); // Works for nested dependencies
// jest.mock('src/modules/Example/add'); // Works for nested dependencies

/**
 * Next.js attaches the router to the global props, we can create GET queries to pass data around.
 *
 * For create/update modals, we use ?action=create or ?action=update to toggle * visibility.
 */
describe('URL query parameters', () => {
  it('is true', () => {
    expect(true).toEqual(true);
  });
  // it('?action=create should be visible for action=create', () => {
  //   const args: IActionQueryProps = {
  //     param: QueryParams.ACTION,
  //     action: RouteAction.CREATE,
  //   };
  //   const mockedProps = mockedQueryProps(args);
  //   const visibility = getVisibilityFromURL(args, mockedProps);
  //
  //   expect(visibility).toEqual(true);
  // });
  //
  // it('?action=create should not be visible for action=update', () => {
  //   const args: IActionQueryProps = {
  //     param: QueryParams.ACTION,
  //     action: RouteAction.CREATE,
  //   };
  //   const args2: IActionQueryProps = {
  //     param: QueryParams.ACTION,
  //     action: RouteAction.UPDATE,
  //   };
  //   const mockedProps = mockedQueryProps(args);
  //   const visibility = getVisibilityFromURL(args2, mockedProps);
  //
  //   expect(visibility).toEqual(false);
  // });
  //
  // it('redirects with the correct route', () => {
  //   const route = Model.INDEX;
  //   redirectTo(route);
  //   expect(Router.pushRoute).toHaveBeenCalledWith(route);
  // });
});

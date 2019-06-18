import { compose, withState, withHandlers, withProps } from 'recompose';
import { withModelList, withModelDelete } from 'src/modules/Model/data/Model-container';

const withGraphqlData = compose(
  withModelList,
  withModelDelete,
);

// const withCRUDComponents = compose(
//   withProps({
//     DeleteConfirmation: ModelDeleteModal,
//     Create: ButtonCreate,
//     Edit: LinkEdit,
//     Delete: compose(ModelDeleteContainer)(ModelDeleteButton),
//     Detail: LinkDetail,
//     List: ListItems,
//   }),
// );

// const withBreadcrumb = compose(
//   withProps({
//     BreadcrumbLinks: BreadcrumbModel,
//   }),
// );

const ModelReadContainer = compose(
  withGraphqlData,
  // withCRUDComponents,
  // withBreadcrumb,
);

export default ModelReadContainer;

import { default as api } from 'src/app/controllers/api';
import { default as authApi } from 'src/app/controllers/auth';
import { default as createApi } from 'src/app/controllers/create';
import { default as deleteApi } from 'src/app/controllers/delete';
import { default as readApi } from 'src/app/controllers/read';
import { default as updateApi } from 'src/app/controllers/update';

const withRoutes = (app: any) => {
  /**
   * My Endpoints
   */
  app.use(api.routes());
  app.use(authApi.routes());
  app.use(deleteApi.routes());
  app.use(updateApi.routes());
  app.use(readApi.routes());
  app.use(createApi.routes());
};

export default withRoutes;

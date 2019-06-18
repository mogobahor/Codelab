const nextRoutes = require('next-routes');

const routes = nextRoutes()
  /**
   * Other
   */
  .add('layout')
  /**
   * Home
   */
  .add({
    name: 'home',
    pattern: '/',
    page: 'index',
  })
  .add({
    name: 'user',
    pattern: '/:username',
    page: 'user/index',
  })
  .add({
    name: 'user.apps',
    pattern: '/:username/:app',
    page: 'user/apps',
  });

const { Link, Router } = routes;

export { Link, Router };

export default routes;

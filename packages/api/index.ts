import * as Koa from 'koa';
import * as mongoose from 'mongoose';
import config from 'src/config/config';
import withMiddleware from 'src/config/middleware';
import withRoutes from 'src/config/routes';

/**
 * Setup App
 */
const app = new Koa();
if (!config.db) {
  throw Error('DB not provided in env ');
}

mongoose.connect(config.db, { useNewUrlParser: true });

/**
 * Add HOC
 */
withMiddleware(app);
withRoutes(app);

/**
 * Connect Server
 */
app.listen(config.port);

const jwt = require('jsonwebtoken');
import * as Router from 'koa-router';
import config from 'src/config/config';

require('src/config/strategy');
const passport = require('koa-passport');

/**
 * Add routes here
 */
const route = new Router({
  prefix: '/auth',
});

route.post('/', ctx => {
  ctx.body = 'Auth';
});

route.post('/register', async ctx =>
  passport.authenticate(
    'register',
    { session: false },
    (err, user, info, status) => {
      // console.log(`Status: ${status}`);
      // console.log(`Info: ${info}`);
      // console.log(`User: ${user}`);
      // console.log(`Err: ${err}`);

      if (err) {
        ctx.app.emit('error', err, ctx);
      }

      return ctx;
      // return ctx.logIn(user);
    },
  )(ctx),
);
// try {
//   ctx.body = await User.create(ctx.request.body);
// } catch (err) {
//   console.log(err);
// }

route.get('/logout', ctx => {
  ctx.logout();
  ctx.redirect('/');
});

route.post('/login', async ctx =>
  passport.authenticate(
    'login',
    { session: false },
    (err, user, info, status) => {
      /**
       * Emit to middleware for global error handling.
       */
      if (err) {
        ctx.app.emit('error', err, ctx);
      }

      /**
       * If user exists, sign and return JWT token.
       */
      if (user) {
        ctx.logIn(user, err => {
          const token = jwt.sign({ id: user.username }, config.jwtSecret);
          return (ctx.body = {
            token,
          });
        });
      }

      console.log('match!');

      // if (user === false) {
      //   // ctx.app.emit('error', err, ctx);
      //   ctx.throw(status, info);
      // } else {
      //   ctx.body = { success: true };
      //   return ctx.login(user, { session: false });
      // }
      return ctx;
    },
  )(ctx),
);

route.post(
  '/profile',
  passport.authenticate('jwt', { session: false }),
  async ctx => {
    console.log('profile');
    ctx.body = 'authenticated route successful';
  },
);

export default route;

import User, { IUser, Maybe } from 'src/app/models/User';
import Err from 'src/utils/Err';

const passport = require('koa-passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const fetchUser = async ({ username }): Promise<IUser> => {
  const user: Maybe<IUser> = await User.findOne({ username }).exec();

  if (!user) {
    throw new Err({
      type: 'Application',
      name: 'UserNotFoundException',
      message: 'Username cannot be found',
    });
  }

  return user;
};

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });
//
// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await User.findOne({ id }).exec();
//     done(null, user);
//   } catch (err) {
//     done(err);
//   }
// });

const LocalStrategy = require('passport-local').Strategy;
/**
 * Function is called to authenticate user
 */
passport.use(
  'register',
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      session: false,
    },
    async (username, password, done) => {
      try {
        const user = await User.create({ username, password });
        return done(null, user);
      } catch (err) {
        console.log(err);
        return done(err);
      }
    },
  ),
);

/**
 * JWT Strategy
 */
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'secret',
  issuer: 'accounts.examplesoft.com',
  audience: 'yoursite.net',
};

passport.use(
  new JwtStrategy(opts, (jwtPayload, done) => {
    console.log('JWT strategy');

    done(null, jwtPayload);
  }),
);

/**
 * Login strategy
 */
passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      session: false,
    },
    async (username, password, done) => {
      try {
        /**
         * We are guaranteed a User, because fetchUser() will throw an exception if no user is found.
         */
        const user: IUser = await fetchUser({ username });

        /**
         * Verify password
         */
        await user.verifyPassword(password);

        return done(null, user);
      } catch (e) {
        done(e);
      }
    },
  ),
);

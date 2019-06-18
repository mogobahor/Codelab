const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(
  'register',
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      session: false,
    },
    async (username, password, done) => {
      console.log('register callback');
      try {
        return done(null, {});
      } catch (err) {
        console.log(err);
        return done(err);
      }
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, { username: 'Codelab' });
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

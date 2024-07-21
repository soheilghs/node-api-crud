const passport = require('passport');
const User = require('app/models/User');
const passportJWT = require('passport-jwt');

const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;

passport.use('jwt', new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromExtractors([
    ExtractJWT.fromUrlQueryParameter('api_token')
  ]),
  secretOrKey: config.jwt.secret_key
}, async (jwtPayload, done) => {
  try {
    let user =
      await User.findById(jwtPayload.id);

    if (user) {
      done(null, user);
    } else {
      done(null, false, {
        message: 'شما اجازه دسترسی به این لینک را ندارید'
      })
    }
  } catch (err) {
    done(null, false, {message: err.message})
  }
}));
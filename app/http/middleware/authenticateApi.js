const Middleware = require('./middleware');
const passport = require('passport');

class AuthenticateApi extends Middleware {

  handle(req, res, next) {
    passport.authenticate('jwt',
      {session: false},
      (err, user, info) => {
        if (err || !user) {
          return res.status(401).json({
            data: info.message || 'اجازه دسترسی ندارید',
            status: 'error'
          });
        }

        req.user = user;
        next();
      })(req, res, next);
  }
}

module.exports = new AuthenticateApi();
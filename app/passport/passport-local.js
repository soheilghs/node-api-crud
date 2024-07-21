const passport = require('passport');
const LocalStrategy =
  require('passport-local').Strategy;
const User = require('app/models/User');

passport.serializeUser(function (user, done){
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use('local.register', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, (req, email, password, done) => {
  User.findOne({email}, (err, user) => {
    if(err) {
      return done(err);
    }

    if (user) {
      return done(null, false,
        req.flash('errors', 'چنین کاربری قبلا در سایت ثبت نام کرده است'));
    }

    const newUser = new User({
      name: req.body.name,
      email
    });

    newUser.$set({
      password: newUser.hashPassword(password)
    });

    newUser.save(err => {
      if(err) {
        return done(err, false, req.flash('errors',
          'ثبت نام با موفقیت انجام نشد.لطفا دوباره سعی کنید'));
      }

      done(null, newUser);
    });
  });
}));

passport.use('local.login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, (req, email, password, done) => {
  User.findOne({email}, (err, user) => {
    if(err) {
      return done(err);
    }

    if (!user || (!user.comparePassword(password))) {
      return done(null, false, req.flash('errors',
        'اطلاعات وارد شده مطابقت ندارد'));
    }

    done(null, user);
  });
}));
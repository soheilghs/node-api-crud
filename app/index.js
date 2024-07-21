const express = require('express');
const app = express();
const http = require('http');
const bodyParser = require('body-parser');
const cookieParser =
  require('cookie-parser');
const validator =
  require('express-validator');
const session =
  require('express-session');
const mongoose = require('mongoose');
const flash =
  require('connect-flash');
const passport = require('passport');
const Helpers = require('./helpers');
const methodOverride =
  require('method-override');
const i18n = require("i18n");
const helmet =
  require('helmet');

module.exports = class Application {
  constructor() {
    this.setupExpress();
    this.setMongoConnection();
    this.setConfig();
    this.setRouters();
  }

  setupExpress() {
    const server = http.createServer(app);
    server.listen(config.port, () => console.log(`Listening on port ${config.port}`));
  }

  setMongoConnection() {
    mongoose.Promise = global.Promise;
    mongoose.connect(config.database.url,
      {
        useNewUrlParser: true
      });
  }

  /**
   * Express Config
   */
  setConfig() {
    require('app/passport/passport-local');
    require('app/passport/passport-jwt');

    app.enable('trust proxy');
    app.use(helmet());


    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(methodOverride('_method'));
    app.use(validator());
    app.use(session({...config.session}));
    app.use(cookieParser(config.cookie_secretkey));
    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());

    i18n.configure({
      locales:['en', 'fa'],
      defaultLocale : 'fa',
      cookie : 'lang',
      objectNotation: true,
    });

    app.use(i18n.init);

    app.use((req,
             res,
             next) => {
      app.locals = new Helpers(req, res).getObjects();
      next();
    });
  }

  setRouters() {
    app.use(require('app/routes/api'));
  }
}
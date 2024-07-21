const path = require('path');
const autoBind = require('auto-bind');
const moment = require('moment-jalaali');

moment.loadPersian({usePersianDigits: true});

module.exports = class Helpers {

  constructor(req, res) {
    autoBind(this);
    this.req = req;
    this.res = res;
    this.formData = req.flash('formData')[0];
  }

  getObjects() {
    return {
      auth: this.auth(),
      viewPath: this.viewPath,
      ...this.getGlobalVariables(),
      old: this.old,
      date: this.date,
      req: this.req
    }
  }

  auth() {
    return {
      check: this.req.isAuthenticated(),
      user: this.req.user
    }
  }

  getGlobalVariables() {
    return {
      errors: this.req.flash('errors')
    }
  }

  date(time) {
    return moment(time);
  }
}
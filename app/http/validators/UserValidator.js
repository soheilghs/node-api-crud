const Validator = require('./Validator');
const {check} = require('express-validator/check');
const User = require('app/models/User');

class UserValidator extends Validator {

  handle() {
    return [
      check('name')
        .not().isEmpty()
        .withMessage('فیلد نام نمیتواند خالی بماند')
        .isLength({min: 5})
        .withMessage('فیلد نام نمیتواند کمتر از 5 کاراکتر باشد'),
      check('email')
        .not().isEmpty()
        .withMessage('فیلد ایمیل نمیتواند خالی بماند')
        .isEmail()
        .withMessage('فیلد ایمیل معتبر نیست')
        .custom(async (value, {req}) => {
          if (req.method === 'PUT') {
            let user = await User.findById(req.params.id);

            if (user.email === value) {
              return;
            }
          }

          let user = await User.findOne({
            email: value
          });

          if (user) {
            throw new Error('چنین ایمیلی قبلا ثبت شده است');
          }
        }),
      check('password')
        .not().isEmpty()
        .withMessage('فیلد پسورد نمیتواند خالی بماند')
        .isLength({min: 8})
        .withMessage('فیلد پسورد نمیتواند کمتر از 8 کاراکتر باشد')
    ];
  }
}

module.exports = new UserValidator();
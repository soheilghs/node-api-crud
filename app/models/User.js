const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const uniqueString = require('unique-string');
const mongoosePaginate =
  require('mongoose-paginate');
//const Learning = require('app/models/Learning');

const userSchema = Schema({
  name: {type: String, required: true},
  active: {type: Boolean, default: false},
  admin: {type: Boolean, default: 0},
  email: {type: String, unique: true, required: true},
  password: {type: String, required: true},
  rememberToken: {type: String, default: false},
}, {
    timestamps: true,
    toJSON: {virtuals: true}
});

userSchema.methods.hashPassword = function (password) {
  let salt = bcrypt.genSaltSync(8);
  return bcrypt.hashSync(password, salt);
}

userSchema.plugin(mongoosePaginate);

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.setRememberToken = function (res) {
  const token = uniqueString();
  res.cookie('remember_token', token, {
    maxAge: 1000 * 60 * 60 * 24 * 90,
    httpOnly: true,
    signed: true
  });
  this.update({
    rememberToken: token
  }, err => {
    if (err) {
      console.log(err);
    }
  });
}

module.exports = mongoose.model('User', userSchema);
const express = require('express');
const router = express.Router();

// Validators
const LoginValidator =
  require('app/http/validators/LoginValidator');

// Controllers
const AuthController =
  require('app/http/controllers/api/v1/AuthController');

router.post('/login',
  LoginValidator.handle(),
  AuthController.login);

module.exports = router;
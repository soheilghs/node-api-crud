const express = require('express');
const router = express.Router();

const authenticateApi =
  require('app/http/middleware/authenticateApi');

// Validators
const UserValidator =
  require('app/http/validators/UserValidator');

// Controllers
const UserController =
  require('app/http/controllers/api/v1/UserController');

router.use(authenticateApi.handle);

router.get('/users', UserController.index);
router.get('/users/:id', UserController.single);
router.post('/users',
  UserValidator.handle(),
  UserController.store);
router.put('/users/:id',
  UserValidator.handle(),
  UserController.update);
router.delete('/users/:id', UserController.destroy);

module.exports = router;
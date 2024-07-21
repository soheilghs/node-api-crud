const express = require('express');
const router = express.Router();

const forEveryOne = require('./public');
const forUser = require('./private');



const notFound =
  require('app/http/middleware/notFound');

router.use(forEveryOne);
router.use(forUser);
router.use(notFound);

module.exports = router;
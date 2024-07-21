const express =
  require('express');
const router = express.Router();
const cors =
  require('cors');

const api_v1 = require('./v1');



router.use((req,
            res,
            next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept")
  next();
});

router.use('/api/v1', cors(),  api_v1);

module.exports = router;
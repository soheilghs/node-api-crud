const express = require('express');
const router = express.Router();

const notFound = (req, res) => {
  res.status(404).json({
    data: 'چنین صفحه ای یافت نشد',
    status: 'error'
  });
}

router.get('*', notFound);
router.post('*', notFound);
router.put('*', notFound);
router.delete('*', notFound);

module.exports = router;
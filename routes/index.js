const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
// Hello World route
router.get('/', (req, res) => {
  res.send('Hello World! - The Contacts API is running');
});

// Mount contacts router
router.use('/contacts', require('./contacts'));

module.exports = router;
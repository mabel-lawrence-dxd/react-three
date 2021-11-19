'use strict';

const router = require('express').Router();

// Your routes go here!

//employees route
router.use('/employees', require('./employees'));

//years route
router.use('/years', require('./years'));

router.use((req, res, next) => {
  const err = new Error('API route not found!');
  err.status = 404;
  next(err);
});

module.exports = router;

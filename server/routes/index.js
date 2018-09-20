const express = require('express');
const router = express.Router();
const debug = require('debug')('server:api');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send(
    {
      healthCheck: "ok",
      uptime: `${process.uptime()} sec`
    });
});

router.post('/optimize', function(req, res, next) {
  // input data validation
  // validation: rooms property
  debug('validation started');
  if (req.body.hasOwnProperty('rooms') && req.body.rooms.length > 0) {
    if (req.body.rooms.every((room) => typeof room === 'number') === false) {
      debug('validation failed for rooms');
      res.status(400);
      res.json({'Validation Error': `At least one element of array in 'rooms' property is not a number`});
    }
  } else {
    // missing rooms property
    debug('validation failed for rooms');
    res.status(400);
    res.json({'Validation Error': `'rooms' property is missing or empty`});
  }

  // validation: senior property
  if (req.body.hasOwnProperty('senior') === false
    || typeof req.body.senior !== 'number') {
    debug('validation failed for senior');
    res.status(400);
    res.json({'Validation Error': `'senior' property is missing or not a number`});
  }

  // validation: junior property
  if (req.body.hasOwnProperty('junior') === false
    || typeof req.body.junior !== 'number') {
    debug('validation failed for junior');
    res.status(400);
    res.json({'Validation Error': `'junior' property is missing or not a number`});
  }

  // everything is fine, we can proceed to business logic


});

module.exports = router;

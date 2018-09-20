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
  const body = req.body;
  // input data validation
  // validation: rooms property
  debug('validation started');
  if (body.hasOwnProperty('rooms') && body.rooms.length > 0) {
    if (body.rooms.every((room) => typeof room === 'number') === false) {
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
  if (body.hasOwnProperty('senior') === false
    || typeof body.senior !== 'number') {
    debug('validation failed for senior');
    res.status(400);
    res.json({'Validation Error': `'senior' property is missing or not a number`});
  }

  // validation: junior property
  if (body.hasOwnProperty('junior') === false
    || typeof body.junior !== 'number') {
    debug('validation failed for junior');
    res.status(400);
    res.json({'Validation Error': `'junior' property is missing or not a number`});
  }

  // everything is fine, we can proceed to business logic
  // going through rooms
  let response = [];
  debug('loop through rooms array');
  body.rooms.forEach((room) => {
    if (room > body.senior) {

    } else {
      debug('singe senior is needed');
      response.push({
        "senior": 1
      });
    }
  });
  res.send(response);

});

module.exports = router;

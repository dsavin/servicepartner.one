const express = require('express');
const router = express.Router();
const debug = require('debug')('server:api');

/* Work force calculation function */
const getWorkForce = (room, senior, junior) => {

  // remove single senior performance since there should be always one senior
  const smallRoom = room - senior;

  let seniorsAmount = 1 + Math.floor(smallRoom/senior);
  let juniorAmount = Math.ceil((room - (senior * seniorsAmount)) / junior);

  // check if we can optimize based on double juniors
  if ((room - (seniorsAmount * senior)) < ((junior * 2) - senior)) {
    seniorsAmount = seniorsAmount - 1;
  }
  const seniorOverlap = ((seniorsAmount + 1) * senior) - room;
  const juniorOverlap = ((seniorsAmount * senior) + (juniorAmount * junior)) - room;

  // check what will be better to add inthe ned
  if (seniorOverlap < juniorOverlap) {
    seniorsAmount = seniorsAmount + 1;
  }

  // final juniors calculation
  juniorAmount = Math.ceil((room - (senior * seniorsAmount)) / junior);


  return {
    'senior': seniorsAmount,
    'junior': juniorAmount
  }
};

/* GET status page. */
router.get('/', function(req, res, next) {
  res.send(
    {
      healthCheck: 'ok',
      uptime: `${process.uptime()} sec`
    });
});

/* POST optimize page. */
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
      debug('calculate amount of seniors nd juniors');
      response.push(getWorkForce(room, body.senior, body.junior));
    } else {
      debug('single senior is needed');
      response.push({
        "senior": 1
      });
    }
  });

  res.send(response);
});

module.exports = router;

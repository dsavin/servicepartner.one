var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send(
    {
      healthCheck: "ok",
      uptime: `${process.uptime()} sec`
    });
});

router.get('/', function(req, res, next) {
  res.send(
    {
      healthCheck: "ok",
      uptime: `${process.uptime()} sec`
    });
});

module.exports = router;

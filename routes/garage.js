var express = require('express');
var router = express.Router();
var garage = require('../controllers/garage');

router.post("/api/garage/openclose" , function (req , res )
{
  res.send(200);
  garage.startGarageDoorLoop();
});

module.exports = router;
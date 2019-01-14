var express = require('express');
var router = express.Router();

router.use('/insert', require('./insert.js'));
// router.use('/showday', require('./showday.js'));
// router.use('/showdiet', require('./showdiet.js'));
// router.use('/showweek', require('./showweek.js'));

module.exports = router;

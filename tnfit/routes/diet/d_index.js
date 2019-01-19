var express = require('express');
var router = express.Router();

router.use('/insert', require('./insert.js'));
// router.use('/showday', require('./showday.js'));
router.use('/showdiet', require('./showdiet.js'));
router.use('/showmeal', require('./showmeal.js'));
router.use('/searchdiet', require('./searchdiet.js'));
router.use('/showweek', require('./showweek.js'));

module.exports = router;

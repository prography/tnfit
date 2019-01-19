var express = require('express');
var router = express.Router();

router.use('/insert', require('./insert.js'));
<<<<<<< HEAD
// router.use('/showday', require('./showday.js'));
router.use('/showdiet', require('./showdiet.js'));
router.use('/showmeal', require('./showmeal.js'));
router.use('/searchdiet', require('./searchdiet.js'));
router.use('/showweek', require('./showweek.js'));
=======
router.use('/showday', require('./showday.js'));
 router.use('/showdiet', require('./showdiet.js'));
  router.use('/showmeal', require('./showmeal.js'));
   router.use('/searchdiet', require('./searchdiet.js'));
// router.use('/showweek', require('./showweek.js'));
>>>>>>> c2ef5f586ce46abdd80299c4542bd437336f95c8

module.exports = router;

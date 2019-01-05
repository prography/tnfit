var express = require('express');
var router = express.Router();

router.use('/edit', require('./edit.js'));
// router.use('/show', require('./show.js'));
// router.use('/withdrawal', require('./withdrawal.js'));

module.exports = router;

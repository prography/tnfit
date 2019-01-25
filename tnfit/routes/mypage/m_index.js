var express = require('express');
var router = express.Router();

router.use('/show', require('./show.js'));
router.use('/withdrawal', require('./withdrawal.js'));
router.use('/edit', require('./edit.js'));

module.exports = router;

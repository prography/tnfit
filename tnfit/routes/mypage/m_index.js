var express = require('express');
var router = express.Router();

router.use('/edit', require('./edit.js'));
router.use('/show', require('./show.js'));

module.exports = router;
var express = require('express');
var router = express.Router();

router.use('/accept', require('./accept.js'));
<<<<<<< HEAD
// router.use('/editlist', require('./editlist.js'));
// router.use('/frienddiet', require('./frienddiet.js'));
router.use('/friendlist', require('./friendlist.js'));
router.use('/request', require('./request.js'));
=======
router.use('/editlist', require('./editlist.js'));
router.use('/frienddiet', require('./frienddiet.js'));
// router.use('/friendlist', require('./friendlist.js'));
// router.use('/request', require('./request.js'));
>>>>>>> d35dafcfda83fc0149c9ac54ba90288a6d4a80d0
router.use('/requestlist', require('./requestlist.js'));
router.use('/search', require('./search.js'));

module.exports = router;

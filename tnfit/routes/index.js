var express = require('express');
var router = express.Router();
router.use('/user', require('./user/u_index.js'));
 router.use('/mypage', require('./mypage/m_index.js'));
 router.use('/friend', require('./friend/f_index.js'));
 router.use('/diet', require('./diet/d_index.js'));

module.exports = router;

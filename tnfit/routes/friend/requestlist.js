// 친구요청 목록보기 - 예은 requeslist.js
const express = require('express');
const router = express.Router();
const db = require('../../module/pool.js');

router.get('/:id', async (req, res) => {
   let myId = req.params.id;

   if (!myId) {
      res.status(400).send({
         message : "Null Value"
      });
   } else {
     let requestQuery = 'SELECT user.u_nickname, user.u_id FROM user, request WHERE request.r_friend = ? AND request.r_me = user.u_id;'
     let requestResult = await db.queryParam_Arr(requestQuery, [myId]);

     if (!requestResult) {
       res.status(500).send({
         message : "Server error"
       });
     } else {
       res.status(201).send({
         message : "ok",
         data : {friends:requestResult}
       });
     }
   }
});


module.exports = router;

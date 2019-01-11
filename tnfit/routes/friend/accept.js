// 친구요청 수락/거절 - 예은 accept.js
const express = require('express');
const router = express.Router();
const db = require('../../module/pool.js');

router.post('/', async (req, res) => {
   let myId = req.body.myId;
   let friendId = req.body.friendId;
   let accept = req.body.accept; // 0이면 reject, 1이면 accept

   if (!friendId) {
      res.status(400).send({
         message : "Null Value"
      });
   } else {
     if (accept == 0){
       let requestQuery = 'DELETE FROM request WHERE r_me = myId AND r_friend = friendId; UPDATE user SET u_frequest = u_frequest-1 WHERE u_id = myId';
       let requestResult = await db.queryParam_Arr(requestQuery, [myId]);

       if (!requestResult) {
         res.status(500).send({
           message : "Server error"
         });
       } else {
         res.status(201).send({
           message : "ok",
           data : [{friendNicknames:requestResult}]
         });
       }
     }
     else { // accept == 1
       let requestQuery = 'SELECT user.u_nickname FROM user, request WHERE request.r_me = ? AND request.r_friend = user.u_id;'
       let requestResult = await db.queryParam_Arr(requestQuery, [myId]);

       if (!requestResult) {
         res.status(500).send({
           message : "Server error"
         });
       } else {
         res.status(201).send({
           message : "ok",
           data : [{friendNicknames:requestResult}]
         });
       }
     }
   }
});


module.exports = router;

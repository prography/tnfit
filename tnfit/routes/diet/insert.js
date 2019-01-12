// 식단 입력 - 예은 - insert.js
/////// 차영언니가 음식별 영양정보를 보여준다고 했는데 그 이후에 몇 인분ㄷ
const express = require('express');
const router = express.Router();
const db = require('../../module/pool.js');

router.get('/:foodId', async (req, res) => {
   let myId = req.body.myId;
   let friendId = req.body.friendId;
   let accept = req.body.accept; // 0이면 reject, 1이면 accept
   let open = req.body.open;

   if (!friendId || !myId) {
      res.status(400).send({
         message : "Null Value"
      });
   } else {
     if (accept == 0){
       let requestQuery1 = 'DELETE FROM request WHERE r_me = ? AND r_friend = ?;';
       let requestQuery2 = 'UPDATE user SET u_frequest = u_frequest - 1 WHERE u_id = ?;'
       let requestResult1 = await db.queryParam_Arr(requestQuery1, [myId, friendId]);
       let requestResult2 = await db.queryParam_Arr(requestQuery2, [myId]);

       if (!requestResult1 || !requestResult2) {
         res.status(500).send({
           message : "Server error"
         });
       } else {
         res.status(201).send({
           message : "ok"
         });
       }
     }
     else { // accept == 1
       let requestQuery1 = 'INSERT INTO friendList(l_me, l_friend, l_open) VALUES (?, ?, ?);';
       let requestQuery2 = 'INSERT INTO friendList(l_me, l_friend, l_open) VALUES (?, ?, (SELECT r_open FROM request WHERE r_me = ? AND r_friend = ?));';
       let requestQuery3 = 'DELETE FROM request WHERE r_me = ? AND r_friend = ?;';
       let requestQuery4 = 'UPDATE user SET u_frequest = u_frequest - 1 WHERE u_id = ?;'
       let requestResult1 = await db.queryParam_Arr(requestQuery1, [myId, friendId, open]);
       let requestResult2 = await db.queryParam_Arr(requestQuery2, [friendId, myId, myId, friendId]);
       let requestResult3 = await db.queryParam_Arr(requestQuery3, [myId, friendId]);
       let requestResult4 = await db.queryParam_Arr(requestQuery4, [myId]);

       if (!requestResult1 || !requestResult2 || !requestResult3 || !requestResult4) {
         res.status(500).send({
           message : "Server error"
         });
       } else {
         res.status(201).send({
           message : "ok"
         });
       }
     }
   }
});


module.exports = router;

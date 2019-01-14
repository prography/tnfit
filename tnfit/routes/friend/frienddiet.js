// 친구 식단 보기 - 예은 frienddiet.js
/////// 친구 식단은 어떻게 보여주지? 일별 달별
const express = require('express');
const router = express.Router();
const db = require('../../module/pool.js');
const url = require

router.get('/', async (req, res) => {
  let myId = req.query.myId;
  let friendId = req.query.friendId;

  if (!myId || !friendId) {
     res.status(400).send({
        message : "Null Value"
     });
  } else {
    let requestQuery1 = 'INSERT INTO friendList(l_me, l_friend, l_open) VALUES (?, ?, ?);';
    let requestQuery2 = 'DELETE FROM request WHERE r_me = ? AND r_friend = ?;';
    let requestQuery3 = 'UPDATE user SET u_frequest = u_frequest - 1 WHERE u_id = ?;'
    let requestResult1 = await db.queryParam_Arr(requestQuery1, [myId, friendId, open]);
    let requestResult2 = await db.queryParam_Arr(requestQuery2, [myId, friendId]);
    let requestResult3 = await db.queryParam_Arr(requestQuery3, [myId]);

    if (!requestResult1 || !requestResult2 || !requestResult3) {
      res.status(500).send({
        message : "Server error"
      });
    } else {
      res.status(201).send({
        message : "ok"
      });
    }
  }
});


module.exports = router;

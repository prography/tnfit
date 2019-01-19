// 친구 목록 편집(삭제, 공개여부 수정) - 예은 editlist.js
const express = require('express');
const router = express.Router();
const db = require('../../module/pool.js');

router.post('/', async (req, res) => {
  let myId = req.body.myId;
  let friendId = req.body.friendId;
  let dlt = req.body.dlt; // delete == 1 이면 삭제, 0이면 x
  let open = req.body.open;

  if (!myId) {
     res.status(400).send({
        message : "Null Value"
     });
  } else {
    if (dlt == 1){
      let requestQuery = 'DELETE FROM friendList WHERE l_me = ? AND l_friend = ?;'
      let requestResult = await db.queryParam_Arr(requestQuery, [myId, friendId]);

      if (!requestResult) {
        res.status(500).send({
          message : "Server error"
        });
      } else {
        res.status(201).send({
          message : "ok"
        });
      }
    }
    else {
      let requestQuery = 'UPDATE friendList SET l_open = ? WHERE l_me = ? AND l_friend = ?;';
      let requestResult = await db.queryParam_Arr(requestQuery, [open, myId, friendId]);

      if (!requestResult) {
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

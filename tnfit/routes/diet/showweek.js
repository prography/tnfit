// 주별 칼로리 정보 보여주기 - 예은 -showweek.js
const express = require('express');
const router = express.Router();
const db = require('../../module/pool.js');

router.get('/', async (req, res) => {
  let friendId = req.query.friendId;
  let date = req.query.date; // YYMMD
  console.log(date)

  if (!friendId || !date) {
     res.status(400).send({
        message : "Null Value"
     });
  } else {
    let i
    for (i=0; i<7; i++){
      let requestQuery1 = 'SELECT f_id, f_unit FROM ate WHERE d_id IN (SELECT d_id FROM diet WHERE date(d_date) = DATE_SUB(?, INTERVAL ? DAY) AND u_id = ?);'
      let requestResult1 = await db.queryParam_Arr(requestQuery1, [date, i, friendId]);


      if (!requestResult1) {
        res.status(500).send({
          message : "Server error"
        });
      } else {
        res.status(201).send({
          message : "ok",
          data : requestResult1
        });
      }
    }
  }
});


module.exports = router;

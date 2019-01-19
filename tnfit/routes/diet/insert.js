// 식단 입력 - 예은 - insert.js
const express = require('express');
const router = express.Router();
const db = require('../../module/pool.js');

router.post('/', async (req, res) => {
  let userId = req.body.userId;
  let foodId = req.body.foodId;
  let year = req.body.year;
  let month = req.body.month;
  let day = req.body.day;
  let flag = req.body.flag; // 아침, 점심, 저녁, 간식
  let unit = req.body.unit;

  let date = year + '-' + month + '-' + day;
  console.log(date)

  if (!userId || !foodId) {
    res.status(400).send({
       message : "Null Value"
    });
  } else {
    let requestQuery1 = 'SELECT d_id FROM diet WHERE u_id = ? AND DATE(d_date) = ? AND d_flag = ?;'
    let requestResult1 = await db.queryParam_Arr(requestQuery1, [userId, date, flag])

    if (!requestResult1) {
      res.status(500).send({
        message : "Server error"
      });
    } else {
      if(requestResult1[0] == undefined){ // 기존에 d_id가 저장이 안 되어있을 경우
        let requestQuery2 = 'INSERT INTO diet(u_id, d_date, d_flag) VALUES (?, ?, ?);'
        let requestQuery3 = 'SELECT d_id FROM diet WHERE u_id = ? AND DATE(d_date) = ? AND d_flag = ?;'

        let requestResult2 = await db.queryParam_Arr(requestQuery2, [userId, date, flag])
        let requestResult3 = await db.queryParam_Arr(requestQuery3, [userId, date, flag])
        let d_id = requestResult3[0].d_id

        let requestQuery4 = 'INSERT INTO ate(u_id, f_id, d_id, f_unit) VALUES (?, ?, ?, ?);'
        let requestResult4 = await db.queryParam_Arr(requestQuery4, [userId, foodId, d_id, unit])

        if (!requestResult2 || !requestResult3 || !requestResult4) {
          res.status(500).send({
            message : "Server error"
          });
        } else {
          res.status(201).send({
            message : "ok"
          });
        }
      }
      else { // 기존 diet에 저장이 되어있을 때
        let d_id = requestResult1[0].d_id
        let requestQuery2 = 'INSERT INTO ate(u_id, f_id, d_id, f_unit) VALUES (?, ?, ?, ?);'
        let requestResult2 = await db.queryParam_Arr(requestQuery2, [userId, foodId, d_id, unit])

        if (!requestResult2) {
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
  }
});


module.exports = router;

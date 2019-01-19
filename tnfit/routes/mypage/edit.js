// 마이페이지 수정하기 - 예은 edit.js
///////////////// pw 수정하는 부분 고쳐야 함
const express = require('express');
const router = express.Router();
const db = require('../../module/pool.js');

router.post('/', async (req, res) => {
  require('date-utils');
  let newDate = new Date();
  let currentTime = newDate.toFormat('YYYY-MM-DD HH24:MI:SS');
  let userId = req.body.userId;
  let userEmail = req.body.userEmail;
  let userPw = req.body.userPw;
  let userNickname = req.body.userNickname;
  let userSex = req.body.userSex;
  let userBirthYear = req.body.userBirthYear;
  let userBirthMonth = req.body.userBirthMonth;
  let userBirthDay = req.body.userBirthDay;
  let userHeight = req.body.userHeight;
  let userWeight = req.body.userWeight;

  let userBirth = userBirthYear + "-" + userBirthMonth + "-" + userBirthDay;

  if (!userId) {
    res.status(400).send({
        message : "Null Value"
      });
    } else {
    let requestQuery = 'UPDATE user'
                        + ' SET u_pw = ?, u_email = ?, u_nickname = ?, u_sex = ?, u_birth = ?, u_height = ?, u_weight = ?, u_intime = ?'
                        + ' WHERE u_id = ?;'
    let requestResult = await db.queryParam_Arr(requestQuery, [userPw, userEmail, userNickname, userSex, userBirth, userHeight, userWeight, currentTime, userId]);

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
});

module.exports = router;

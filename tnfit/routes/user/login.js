const express = require('express');
const router = express.Router();
const db = require('../../module/pool.js');
const bcrypt = require('bcrypt-nodejs');

router.post('/', async (req,res)=>{
  let u_pw = req.body.u_pw
  let u_email = req.body.u_email

	if(!u_pw|!u_email){
		res.status(400).send({
			message : "Null Value"
		})
	}else{
  	let requestQuery = 'SELECT u_pw FROM user WHERE u_email = ?'
  	let requestResult = await db.queryParam_Arr(requestQuery,[u_email])

    if (!requestResult){
      res.status(500).send({
  			message:"server error"
  		})
  	}else{
      let hash = requestResult[0].u_pw
      let result = bcrypt.compareSync(u_pw, hash) // true false 반환

      if (!result) {
        res.status(201).send({
          message:"ok",
          flag: 0
        })
      } else {
        let loginQuery = "UPDATE user SET u_state = 0 WHERE u_email = ?;"
        let useridQuery = "SELECT u_id, u_nickname FROM user WHERE u_email = ?;"
        let loginResult = await db.queryParam_Arr(loginQuery, [u_email])
        let useridResult = await db.queryParam_Arr(useridQuery, [u_email])


        if (!loginResult || !useridResult){
          res.status(500).send({
      			message:"server error"
      		})
        }
        else {
          res.status(201).send({
      			message:"ok",
            flag: 1,
            data: useridResult[0]
      		})
        }
      }
    }
	}
});


module.exports = router;

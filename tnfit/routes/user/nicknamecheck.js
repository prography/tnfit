const express = require('express');
const router = express.Router();
const db = require('../../module/pool.js');
const bcrypt = require('bcrypt-nodejs');

router.get('/:u_nickname',async (req,res)=>{
  let u_nickname = req.params.u_nickname

	if(!u_nickname){
		res.status(400).send({
			message : "Null Value"
		})
	}else{
		let nickQuery = 'SELECT * FROM user WHERE u_nickname = ?'
		let nickResult = await db.queryParam_Arr(nickQuery,[u_nickname])

		if(!nickResult){
			res.status(500).send({
				message:"server error"
			})
		}else{
      if (nickResult[0] == 'undefined'){
        res.status(201).send({ //ok
  				message:"ok",
          data: 1
  			})
      }
      else {
        res.status(201).send({ //not ok
  				message:"ok",
          data: 0
  			})
      }
		}
	}
});


module.exports = router;

const express = require('express');
const router = express.Router();
const db = require('../../module/pool.js');
const bcrypt = require('bcrypt-nodejs');

router.get('/:u_email',async (req,res)=>{
  let u_email = req.params.u_email

	if(!u_email){
		res.status(400).send({
			message : "Null Value"
		})
	}else{
		let emailQuery = 'SELECT * FROM user WHERE u_email = ?'
		let emailResult = await db.queryParam_Arr(emailQuery,[u_email])

		if(!emailResult){
			res.status(500).send({
				message:"server error"
			})
		}else{
      if (emailResult[0] == 'undefined'){
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

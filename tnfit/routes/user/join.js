const express = require('express');
const router = express.Router();
const db = require('../../module/pool.js');
const bcrypt = require('bcrypt-nodejs');
const saltRounds = 10

router.post('/', async (req,res)=>{
  let u_pw = req.body.u_pw
  let u_email = req.body.u_email
  let u_nickname = req.body.u_nickname
  let u_sex = req.body.u_sex
  let u_birth = req.body.u_birth
  let u_height = req.body.u_height
  let u_weight = req.body.u_weight

	if(!u_pw|!u_email|!u_nickname|!u_sex|!u_birth|!u_height|!u_weight){
		res.status(400).send({
			message : "Null Value"
		})
	}else{
    let salt = bcrypt.genSaltSync(saltRounds)
    const hash = bcrypt.hashSync(u_pw, salt)
    console.log(hash)
    // let hashedPassword = await bcrypt.hash(u_pw, BCRYPT_SALT_ROUNDS)
    // console.log(hashedPassword)
  	// 	// let emailQuery = 'SELECT * FROM user WHERE u_email like ?'
  	// 	// let emailResult = await db.queryParam_Arr(emailQuery,[u_email])
    //   // console.log(emailResult[0])
    //   // console.log(nickResult[0])

  	// if(!){
  	// 	res.status(500).send({
  	// 		message:"server error"
  	// 	})
  	// }else{
  		res.status(201).send({
  			message:"ok"
  		})
  	// }
	}
});


module.exports = router;

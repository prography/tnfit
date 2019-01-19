const express = require('express');
const router = express.Router();
const crypto = require('crypto-promise'); 
const db = require('../../module/pool.js');
const bcrypt = require('bcrypt-nodejs');
const saltRounds = 10; // default 10

router.post('/',async (req,res)=>{

	let u_nickname = req.body.u_nickname;
	let u_email = req.body.u_email;
	let u_pw = req.body.u_pw;
	let u_height = req.body.u_height;
	let u_weight = req.body.u_weight;
	let u_sex = req.body.u_sex;
	let u_birth = req.body.u_birth;
	const salt = bcrypt.genSaltSync(saltRounds);
	if(!u_nickname||!u_email||!u_pw||!u_height||!u_weight||!u_sex||!u_birth){
		res.status(400).send({
			message : "Null Value"
		})
	}else{

			const hash = bcrypt.hashSync(u_pw, salt);
			let insertQuery = 'INSERT INTO user(u_nickname, u_email, u_pw, u_height, u_weight, u_sex, u_birth, u_salt) values(?,?,?,?,?,?,?,?)'
			let insertList = await db.queryParam_Arr(insertQuery,[u_nickname, u_email, hash,u_height, u_weight, u_sex, u_birth,salt]);

			if(!insertList){
			res.status(500).send({
				message:"server error"
			})
		}else{
			res.status(201).send({
				message:"ok"
			})
		}
		
	}
});

module.exports = router;
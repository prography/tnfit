const express = require('express');
const router = express.Router();
const crypto = require('crypto-promise'); 
const db = require('../../module/pool.js');

router.get('/:u_nickname',async (req,res)=>{
	//let u_nickname = req.params.u_nickname;
	let u_nickname = req.params.u_nickname+'%';
	if(!u_nickname){
		res.status(400).send({
			message : "Null Value"
		})
	}else{
		let showQuery = 'SELECT u_nickname, u_id FROM user WHERE u_nickname like ?'
		let getList = await db.queryParam_Arr(showQuery,[u_nickname]);

		if(!getList){
			res.status(500).send({
				message:"server error"
			})
		}else{
			res.status(201).send({
				message:"ok",
				data:getList
			})
		}
	}
});


module.exports = router;
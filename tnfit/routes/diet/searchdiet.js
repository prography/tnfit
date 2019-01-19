const express = require('express');
const router = express.Router();
const crypto = require('crypto-promise'); 
const db = require('../../module/pool.js');

router.get('/:f_name',async (req,res)=>{
	//let u_nickname = req.params.u_nickname;
	let f_name = req.params.f_name+'%';
	if(!f_name){
		res.status(400).send({
			message : "Null Value"
		})
	}else{
		let showQuery = 'SELECT f_name FROM food WHERE f_name like ?'
		let getList = await db.queryParam_Arr(showQuery,[f_name]);

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
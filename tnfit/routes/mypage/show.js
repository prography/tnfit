const express = require('express');
const router = express.Router();
const crypto = require('crypto-promise'); 
const db = require('../../module/pool.js');

router.get('/:u_id',async (req,res)=>{
	let u_id = req.params.u_id;

	if(!u_id){
		res.status(400).send({
			message : "Null Value"
		})
	}else{
		let showQuery = 'SELECT u_nickname, u_sex, u_height, u_weight, u_frequest FROM user WHERE u_id = ?'
		let getList = await db.queryParam_Arr(showQuery,[u_id]);

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
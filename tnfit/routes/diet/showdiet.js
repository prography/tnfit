const express = require('express');
const router = express.Router();
const crypto = require('crypto-promise');
const db = require('../../module/pool.js');

router.get('/:f_id',async (req,res)=>{
	let f_id = req.params.f_id;
	if(!f_id){
		res.status(400).send({
			message : "Null Value"
		})
	}else{
		let showQuery = 'SELECT f_id, f_name, f_cnt, f_unit, f_gram, f_cal, f_carbs, f_protein, f_fat, f_sugar, f_salt FROM food WHERE f_id = ?'
		let getList = await db.queryParam_Arr(showQuery,[f_id]);

		if(!getList){
			res.status(500).send({
				message:"server error"
			})
		}else{
			res.status(201).send({
				message:"ok",
				data:getList[0]
			})
		}
	}
});


module.exports = router;

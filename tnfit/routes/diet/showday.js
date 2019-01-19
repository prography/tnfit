const express = require('express');
const router = express.Router();
const crypto = require('crypto-promise'); 
const db = require('../../module/pool.js');

router.get('/:u_id,d_date',async (req,res)=>{
	let u_id = req.params.u_id;
	let d_date = req.params.d_date;
	if(!u_id||!d_date){
		res.status(400).send({
			message : "Null Value"
		})
	}else{
		let showQuery = 'SELECT f_name, f_cnt, f_unit, f_gram, f_cal, f_carbs, f_protein, f_fat, f_sugar, f_salt FROM food WHERE f_name = ?'
		let getList = await db.queryParam_Arr(showQuery,[f_name]);
		console.log(f_name);
		if(!getList){
			res.status(500).send({
				message:"server error"
			})
		}else{
			res.status(201).send({
				message:"ok",
				data:[getList]
			})
		}
	}
});


module.exports = router;
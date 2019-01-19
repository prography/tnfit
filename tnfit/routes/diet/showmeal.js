const express = require('express');
const router = express.Router();
const crypto = require('crypto-promise'); 
const db = require('../../module/pool.js');

router.get('/:d_id',async (req,res)=>{
	let d_id = req.params.d_id;

	if(!d_id){
		res.status(400).send({
			message : "Null Value"
		})
	}else{
		let showQuery = 'SELECT food.f_name, food.f_unit, ate.f_unit as f_cnt FROM food join ate WHERE ate.f_id = food.f_id and ate.d_id = ? '
		let getList = await db.queryParam_Arr(showQuery,[d_id]);

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
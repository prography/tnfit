const express = require('express');
const router = express.Router();
const crypto = require('crypto-promise');
const db = require('../../module/pool.js');

router.get('/',async (req,res)=>{
	let userId = req.query.userId;
	let date = req.query.date;
	let flag = req.query.flag;

	if(!userId||!date||!flag){
		res.status(400).send({
			message : "Null Value"
		})
	}else{
		let showQuery = 'SELECT food.f_name, food.f_unit, ate.f_unit as f_cnt FROM food, ate, diet WHERE ate.f_id = food.f_id and ate.d_id = diet.d_id and diet.u_id = ? and date(diet.d_date) = ? and diet.d_flag = ?;'
		let getList = await db.queryParam_Arr(showQuery,[userId, date, flag]);

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

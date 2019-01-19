const express = require('express');
const router = express.Router();
const crypto = require('crypto-promise'); 
const db = require('../../module/pool.js');



router.post('/',async (req,res)=>{
	let u_id = req.body.u_id;
	
	if(!u_id){
		res.status(400).send({
			message : "Null Value"
		})
	}else{
			let updateQuery = 'UPDATE user SET u_state = 0 WHERE u_id=?'
			let updateList = await db.queryParam_Arr(updateQuery,[u_id]);

			if(!updateList){
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
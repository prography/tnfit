const express = require('express');
const router = express.Router();
const crypto = require('crypto-promise'); 
const db = require('../../module/pool.js');

router.get('/:l_me',async (req,res)=>{
	let l_me = req.params.l_me;
	if(!l_me){
		res.status(400).send({
			message : "Null Value"
		})
	}else{
		let showQuery = 'SELECT distinct u_nickname,u_id FROM friendList join user WHERE l_me = ? and l_friend = u_id'
		let getList = await db.queryParam_Arr(showQuery,[l_me]);

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
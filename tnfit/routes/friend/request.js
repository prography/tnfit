const express = require('express');
const router = express.Router();
const crypto = require('crypto-promise');  
const db = require('../../module/pool.js');

router.post('/', async (req, res) => {
	let r_me = req.body.r_me;
	let r_friend = req.body.r_friend;
	let r_open = req.body.r_open; 

	if (!r_me||!r_friend||!r_open) {
		res.status(400).send({
			message : "Null Value"
		});
	} else {

			let checkQuery = 'SELECT r_id FROM request WHERE r_me=? and r_friend = ?'
			let checkResult = await db.queryParam_Arr(checkQuery, [r_me,r_friend]);
			console.log(checkResult.length)
			if(checkResult.length!=0){
				res.status(201).send({
					message : "이미 친구입니다"
				});
			}
			else{
		    		let requestQuery = 'INSERT INTO request (r_me,r_friend,r_open) VALUES (?,?,?)'
					let requestResult = await db.queryParam_Arr(requestQuery, [r_me,r_friend,r_open]);

					let insertQuery = 'UPDATE user SET u_frequest=u_frequest+1 WHERE u_id = ?'
					let insertResult = await db.queryParam_Arr(insertQuery, [r_friend]);

					if (!requestResult||!insertResult) {
						res.status(500).send({
							message : "Server error"
						});
					} else {
						res.status(201).send({
							message : "ok"
					});
				}
			}
		}   
});

module.exports = router;

const express = require('express');
const router = express.Router();
const crypto = require('crypto-promise'); 
const db = require('../../module/pool.js');

router.get('/',async (req,res)=>{
	let u_id = req.query.u_id;
	let d_date = req.query.d_date;
	if(!u_id||!d_date){
		res.status(400).send({
			message : "Null Value"
		})
	}else{
		let kcal_sum=0;
		let carbs_sum=0;
		let protein_sum=0;
		let fat_sum=0;
		let sugar_sum = 0;
		let salt_sum=0;

		let getQuery = 'SELECT distinct ate.a_intime, ate.f_unit, food.f_cal, food.f_carbs,food.f_protein,food.f_fat,food.f_sugar,food.f_salt FROM food join ate WHERE food.f_id = ate.f_id and ate.d_id IN(SELECT d_id FROM diet WHERE u_id=? and date(d_date)=?)'
		let getList = await db.queryParam_Arr(getQuery,[u_id,d_date]);		
		
		console.log(getList);
		// let cntQuery = 'SELECT distinct ate.a_intime, ate.f_unit FROM food join ate WHERE food.f_id = ate.f_id and ate.d_id IN(SELECT d_id FROM diet WHERE u_id=? and date(d_date)=?)'
		// let cntList = await db.queryParam_Arr(getQuery,[u_id,date]);		

		if(!getList){
			res.status(500).send({
				message:"server error"
			})
		}else{
			 let i=0;
			 for(i=0;i<getList.length;i++){
			 		kcal_sum=kcal_sum+getList[i].f_cal*getList[i].f_unit;	
					carbs_sum=carbs_sum+getList[i].f_carbs*getList[i].f_unit;
					protein_sum=protein_sum+getList[i].f_protein*getList[i].f_unit;	
					fat_sum=fat_sum+getList[i].f_fat*getList[i].f_unit;
					sugar_sum=sugar_sum+getList[i].f_sugar*getList[i].f_unit;	
					salt_sum=salt_sum+getList[i].f_salt*getList[i].f_unit;
			 }

			res.status(201).send({
				message:"ok",
				data:{"kcal sum":kcal_sum,
					"carbs sum":carbs_sum,
					"protein sum":protein_sum,
					"fat sum":fat_sum,
					"sugar sum":sugar_sum,
					"salt sum":salt_sum}
			})
		}
	}
});


module.exports = router;
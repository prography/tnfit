// 주별 칼로리 정보 보여주기 - 예은 -showweek.js
const express = require('express');
const router = express.Router();
const db = require('../../module/pool.js');

router.get('/', async (req, res) => {
  let userId = req.query.userId;
  let date = req.query.date; // YYMMD

  if (!userId || !date) {
     res.status(400).send({
        message : "Null Value"
     });
  } else {
    let kcal_sum=0;
		let carbs_sum=0;
		let protein_sum=0;
		let fat_sum=0;
		let sugar_sum = 0;
		let salt_sum=0;

    let requestQuery1 = 'SELECT distinct ate.a_id, ate.f_unit, food.f_cal, food.f_carbs,food.f_protein,food.f_fat,food.f_sugar,food.f_salt FROM food join ate WHERE food.f_id = ate.f_id and ate.d_id IN (SELECT d_id FROM diet WHERE u_id=? and date(d_date) >= DATE_SUB(?, INTERVAL 6 DAY) and date(d_date) <= ?);'
    let requestResult1 = await db.queryParam_Arr(requestQuery1, [userId, date, date]);
    console.log(requestResult1)

    if (!requestResult1) {
      res.status(500).send({
        message : "Server error"
      });
    } else {
      let i=0;
      for(i=0;i<requestResult1.length;i++){
         kcal_sum=kcal_sum+requestResult1[i].f_cal*requestResult1[i].f_unit;
         carbs_sum=carbs_sum+requestResult1[i].f_carbs*requestResult1[i].f_unit;
         protein_sum=protein_sum+requestResult1[i].f_protein*requestResult1[i].f_unit;
         fat_sum=fat_sum+requestResult1[i].f_fat*requestResult1[i].f_unit;
         sugar_sum=sugar_sum+requestResult1[i].f_sugar*requestResult1[i].f_unit;
         salt_sum=salt_sum+requestResult1[i].f_salt*requestResult1[i].f_unit;
      }
      kcal_sum = Math.round(kcal_sum / requestResult1.length);
      carbs_sum = Math.round(carbs_sum / requestResult1.length);
      protein_sum = Math.round(protein_sum / requestResult1.length);
      fat_sum = Math.round(fat_sum / requestResult1.length);
      sugar_sum =  Math.round(sugar_sum / requestResult1.length);
      salt_sum =  Math.round(salt_sum / requestResult1.length);

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

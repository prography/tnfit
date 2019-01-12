const express = require('express');
const router = express.Router();
const db = require('../../module/pool.js');


// let requestQuery = 'INSERT INTO Interpretation (userIdx, iboardContent, iboardDate, iboardUrl, iboardTitle) VALUES (?,?,?,?,?)'
// let requestResult = await db.queryParam_Arr(requestQuery, [userIdx, iboardContent, currentTime, iboardUrl, iboardTitle]);

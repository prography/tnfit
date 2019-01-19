const mysql = require('promise-mysql');			// mysql 모듈의 promise 버전

// rds 정보 입력 : hostname, username, password, default DB
const dbConfig = {
	host : 'ec2-13-209-17-166.ap-northeast-2.compute.amazonaws.com',
	port : 3306,
	user : 'root',
	password : 'gathertooweb',
	database : 'TNfit',
	connectionLimit : 20
};

module.exports = mysql.createPool(dbConfig);

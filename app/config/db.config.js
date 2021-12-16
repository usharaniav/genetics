const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS} = require('../../config');


module.exports = {
  MYSQLHOST: DB_HOST,
  MYSQLPORT: parseInt(DB_PORT),
  MYSQLUSER: DB_USER,
  MYSQLPASSWORD: DB_PASS,
  MYSQLDB: DB_NAME

};






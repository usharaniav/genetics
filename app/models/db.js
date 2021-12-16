const mysql = require("mysql2");
const util = require('util');
const dbConfig = require("../config/db.config.js");



var connection = mysql.createConnection({
  host: dbConfig.MYSQLHOST,
  port: dbConfig.MYSQLPORT,
  user: dbConfig.MYSQLUSER,
  password: dbConfig.MYSQLPASSWORD,
  database: dbConfig.MYSQLDB,
  multipleStatements: true
});

connection.connect((err) => {
  if (err) throw err;

  console.log(('MySQL - DB Connection successful...'));
})

//for query param like id=:id
connection.config.queryFormat = function (query, values) {
  if (!values)
    return query;
  return query.replace(/\:(\w+)/g, function (txt, key) {
    if (values.hasOwnProperty(key)) {
      return this.escape(values[key]);
    }
    return txt;
  }.bind(this)).replace(/\@(\w+)/g, function (txt, key) {
    if (values.hasOwnProperty(key)) {
      return (values[key]);
    }
    return txt;
  }.bind(this))
};


//enable async await
connection.query = util.promisify(connection.query);

module.exports = connection;

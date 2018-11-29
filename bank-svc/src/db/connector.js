let mysql = require("mysql"),
	config = require('./../../config');

let conn = mysql.createConnection(config.db);
conn.connect((err) => {
	if (err) throw err;
	else console.log('connected as id ' + conn.threadId)
});

module.exports = conn;
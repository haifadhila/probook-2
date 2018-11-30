const mysql = require("mysql"),
      config = require('./../../config')

const pool = mysql.createPool(config.db)

module.exports = pool

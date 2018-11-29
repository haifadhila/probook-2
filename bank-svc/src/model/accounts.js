const pool = require('../db/connector')

let rowToResult = (row) => {
    return {
        accno: row.id,
        name: row.name,
        card_number: row.card_number,
        balance: balance
    }
}

let byId = (id, callback) => {
    pool.query(
        'select id, name, card_number, balance from accounts where id=?',
        [id],
        function (error, results, fields) {
            if (error)
                callback(error, null)
            else if (results.length < 1)
                callback(null, null)
            else
                callback(null, rowToResult(results[0]))
        })
}

module.exports = {
    byId
}

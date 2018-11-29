const pool = require('../db/connector')

let rowToResult = (row) => {
    return {
        txnid: row.id,
        accno: row.acct,
        amount: row.amount,
        type: row.type,
        remarks: row.remarks,
        time: row.time
    }
}

let byId = (id, callback) => {
    pool.query(
        'select id, acct, amount, type, remarks, time' +
            'from transactions where id=?',
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

let byAccount = (accId, callback) => {
    pool.query(
        'select id, acct, amount, type, remarks, time' +
            'from transactions where acct=? order by id',
        [accId],
        function (error, results, fields) {
            if (error)
                callback(error, null)
            else
                callback(null, results.map(rowToResult))
        })
}

module.exports = {
    byId,
    byAccount
}

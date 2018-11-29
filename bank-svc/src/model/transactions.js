const asyncDb = require('../db/async-db')

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

let byId = async (id) => {
    let results = await asyncDb.poolQuery(
        'select id, acct, amount, type, remarks, time ' +
            'from transactions where id=?',
        [id])
    if (results.length < 1)
        return null
    else
        return rowToResult(results[0])
}

let byAccount = async (accId) =>
    (await asyncDb.poolQuery(
        'select id, acct, amount, type, remarks, time ' +
            'from transactions where acct=? order by id',
        [accId])
    ).map(rowToResult)

//let makeWithdrawal = (req, callback) => {
//
//}

module.exports = {
    byId,
    byAccount,
    //makeDeposit,
    //makeWithdrawal,
    //makeCorrection,
    //doTransfer
}

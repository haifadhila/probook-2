const asyncDb = require('../db/async-db')

const getBalanceQuery = 'select balance from accounts where id=?'
const insertTxnQuery = 'insert into transactions ' +
      '(acct, amount, type, remarks) values (?, ?, ?, ?)'

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

let makeDeposit = async (req) => {
    const txnType = 'deposit'
    if (!Number.isInteger(req.amount) || !Number.isInteger(req.accno))
        throw 'bad params'
    if (req.amount <= 0 || req.type !== txnType)
        throw 'bad params'
    if (req.remarks === undefined)
        req.remarks = null
    return await asyncDb.withTransaction(async (conn) => {
        let result = await asyncDb.query(
            conn,
            'update accounts set balance = balance + ? where id=?',
            [req.amount, req.accno])
        if (result.affectedRows < 1)
            throw 'no account'
        result = await asyncDb.query(conn, getBalanceQuery, [req.accno])
        let finalBalance = result[0].balance
        result = await asyncDb.query(
            conn, insertTxnQuery,
            [req.accno, req.amount, txnType, req.remarks])
        let txnid = result.insertId
        return {
            txnid: txnid,
            accno: req.accno,
            type: txnType,
            amount: req.amount,
            balance: finalBalance
        }
    })
}

let makeWithdrawal = async (req) => {
    const txnType = 'withdrawal'
    if (!Number.isInteger(req.amount) || !Number.isInteger(req.accno))
        throw 'bad params'
    if (req.amount <= 0 || req.type !== txnType)
        throw 'bad params'
    if (req.remarks === undefined)
        req.remarks = null
    return await asyncDb.withTransaction(async (conn) => {
        let result = await asyncDb.query(
            conn,
            'update accounts set balance = balance - ? where id=?',
            [req.amount, req.accno])
        if (result.affectedRows < 1)
            throw 'no account'
        result = await asyncDb.query(conn, getBalanceQuery, [req.accno])
        let finalBalance = result[0].balance
        if (finalBalance < 0)
            throw 'not enough funds'
        result = await asyncDb.query(
            conn, insertTxnQuery,
            [req.accno, req.amount, txnType, req.remarks])
        let txnid = result.insertId
        return {
            txnid: txnid,
            accno: req.accno,
            type: txnType,
            amount: req.amount,
            balance: finalBalance
        }
    })
}

module.exports = {
    byId,
    byAccount,
    makeDeposit,
    makeWithdrawal,
    //makeCorrection,
    //doTransfer
}

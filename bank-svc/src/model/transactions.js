const asyncDb = require('../db/async-db')

const getBalanceQuery = 'select balance from accounts where id=?'
const insertTxnQuery = 'insert into transactions ' +
      '(acct, amount, type, remarks) values (?, ?, ?, ?)'

class TransactionalError extends Error {
    constructor(msg = 'Transactional error', ...params) {
        super(...params)
        if (Error.captureStackTrace)
            Error.captureStackTrace(this, TransactionalError)
        this.msg = msg
    }
}

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

let normaliseTxnRequest = (req) => {
    if (!Number.isInteger(req.amount) || !Number.isInteger(req.accno) ||
        req.amount <= 0 ||
        (req.remarks !== undefined && typeof(req.remarks) !== 'string'))
        throw new TransactionalError('bad params')
    if (req.remarks === undefined)
        req.remarks = null
    return req
}

let makeTxnResult = (req, txnid, txnType, finalBalance) => ({
    txnid: txnid,
    accno: req.accno,
    type: txnType,
    amount: req.amount,
    balance: finalBalance,
    remarks: req.remarks
})

let makeDeposit = async (req) => {
    const txnType = 'deposit'
    req = normaliseTxnRequest(req)
    return await asyncDb.withTransaction(async (conn) => {
        let result = await asyncDb.query(
            conn,
            'update accounts set balance = balance + ? where id=?',
            [req.amount, req.accno])
        if (result.affectedRows < 1)
            throw new TransactionalError('no account')
        result = await asyncDb.query(conn, getBalanceQuery, [req.accno])
        let finalBalance = result[0].balance
        result = await asyncDb.query(
            conn, insertTxnQuery,
            [req.accno, req.amount, txnType, req.remarks])
        let txnid = result.insertId
        return makeTxnResult(req, txnid, txnType, finalBalance)
    })
}

let makeWithdrawal = async (req) => {
    const txnType = 'withdrawal'
    req = normaliseTxnRequest(req)
    return await asyncDb.withTransaction(async (conn) => {
        let result = await asyncDb.query(
            conn,
            'update accounts set balance = balance - ? where id=?',
            [req.amount, req.accno])
        if (result.affectedRows < 1)
            throw new TransactionalError('no account')
        result = await asyncDb.query(conn, getBalanceQuery, [req.accno])
        let finalBalance = result[0].balance
        if (finalBalance < 0)
            throw new TransactionalError('not enough funds')
        result = await asyncDb.query(
            conn, insertTxnQuery,
            [req.accno, req.amount, txnType, req.remarks])
        let txnid = result.insertId
        return makeTxnResult(req, txnid, txnType, finalBalance)
    })
}

module.exports = {
    TransactionalError,
    byId,
    byAccount,
    makeDeposit,
    makeWithdrawal,
    //makeCorrection,
    //doTransfer
}

const accounts = require('../model/accounts')
const transactions = require('../model/transactions')

let handleResp = (res, onSuccess) => {
    return (error, result) => {
        if (error) {
            console.log(error)
            return res.sendStatus(500)
        } else {
            return onSuccess(result)
        }
    }
}

let show = (req, res) => {
    accounts.byId(req.params.accno, handleResp((res, row) => {
        if (row == null)
            return res.sendStatus(404)
        res.send({
            accno: row.accno,
            name: row.name,
            balance: row.balance})
    }))
}

let notSupported = (res) => {
    res.status(500)
    res.send({'error': 'not supported'})
}

let transact = (req, res) => {
    const txnReq = req.body
    switch (txnReq.type) {
    case 'deposit':
        //transactions.makeDeposit(txnReq, handleTxnResp(res))
        //break
    case 'withdrawal':
        //transactions.makeWithdrawal(txnReq, handleTxnResp(res))
        //break
    case 'correction':
        //transactions.makeCorrection(txnReq, handleTxnResp(res))
        //break
    case 'transfer':
        //transactions.doTransfer(txnReq, handleTxnResp(res))
        //break
    default:
        return notSupported(res)
    }
}

let listTransactions = (req, res) => {
    transactions.byAccount(req.params.accno, handleResp((res, rows) => {
        if (rows == null)
            return res.sendStatus(404)
        res.send(rows)
    }))
}

let listCards = (req, res) => {
    accounts.byId(req.params.accno, handleResp((res, row) => {
        if (row == null)
            return res.sendStatus(404)
        res.send({
            accno: row.accno,
            cards: [row.card_number]})
    }))
}

module.exports = {
    show,
    transact,
    listTransactions,
    listCards
}

const accounts = require('../model/accounts')
const transactions = require('../model/transactions')

let handleResp = (promise, onSuccess) =>
    promise.then(
        onSuccess
    ).catch((error) => {
        console.log(error)
        res.sendStatus(500)
    })

let show = (req, res) =>
    handleResp(accounts.byId(req.params.accno), (row) => {
        if (row == null)
            return res.sendStatus(404)
        res.send({
            accno: row.accno,
            name: row.name,
            balance: row.balance})
    })

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

let listTransactions = (req, res) =>
    handleResp(transactions.byAccount(req.params.accno), (rows) => {
        if (rows == null)
            return res.sendStatus(404)
        res.send(rows)
    })

let listCards = (req, res) =>
    handleResp(accounts.byId(req.params.accno), (row) => {
        if (row == null)
            return res.sendStatus(404)
        res.send({
            accno: row.accno,
            cards: [row.card_number]})
    })

module.exports = {
    show,
    transact,
    listTransactions,
    listCards
}

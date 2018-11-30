const accounts = require('../model/accounts')
const transactions = require('../model/transactions')

let handleResp = (res, promise, onSuccess) =>
    promise.then(
        onSuccess
    ).catch((error) => {
        console.log(error)
        res.sendStatus(500)
    })

let show = (req, res) =>
    handleResp(res, accounts.byId(req.params.accno), (row) => {
        if (row == null)
            return res.sendStatus(404)
        res.send({
            accno: row.accno,
            name: row.name,
            balance: row.balance})
    })

let transact = (req, res) => {
    const txnReq = req.body
    handleResp(
        res,
        (async () => {
            switch (txnReq.type) {
            case 'deposit':
                return await transactions.makeDeposit(txnReq)
                break
            case 'withdrawal':
                return await transactions.makeWithdrawal(txnReq)
                break
            case 'correction':
                //return await transactions.makeCorrection(txnReq)
                //break
            case 'transfer':
                return await transactions.doTransfer(txnReq)
                break
            default:
                throw 'not supported'
            }
        })().catch(
            (err) => {
                if (err === 'not supported') {
                    res.status(400)
                    res.send({'error': 'not supported'})
                } else if (err instanceof transactions.TransactionalError) {
                    res.status(400)
                    res.send({'error': err.msg})
                } else {
                    throw err
                }
            }
        ),
        (txnResult) => res.send(txnResult)
    )
}

let listTransactions = (req, res) =>
    handleResp(res, transactions.byAccount(req.params.accno), (rows) => {
        if (rows == null)
            return res.sendStatus(404)
        res.send(rows)
    })

let listCards = (req, res) =>
    handleResp(res, accounts.byId(req.params.accno), (row) => {
        if (row == null)
            return res.sendStatus(404)
        res.send({
            accno: row.accno,
            cards: [row.cardno]})
    })

module.exports = {
    show,
    transact,
    listTransactions,
    listCards
}

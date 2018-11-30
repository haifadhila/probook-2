const express = require('express')

const cards = require('../controller/cards')
const accounts = require('../controller/accounts')
const transactions = require('../controller/transactions')

let index = (req,res) => {
    res.send({'message': 'Bank Service'})
}

module.exports = (app) => {

    app.route('/').get(index)

    app.route('/card/:cardno').get(cards.validate)
    app.route('/card/:cardno/account').get(cards.getAccount)

    const accountRouter = express.Router()
    {
        let r = accountRouter
        r.route('/:accno').get(accounts.show)
        r.route('/:accno/transactions').post(accounts.transact)
        r.route('/:accno/transactions').get(accounts.listTransactions)
        r.route('/:accno/cards').get(accounts.listCards)
    }
    app.use('/account', accountRouter)

    app.route('/transfer').post(transactions.transfer)
    app.route('/transaction/:tid').get(transactions.show)
}

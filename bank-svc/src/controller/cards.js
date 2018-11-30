const accounts = require('../model/accounts')

let handleResp = (res, promise, onSuccess) =>
    promise.then(
        onSuccess
    ).catch((error) => {
        console.log(error)
        res.sendStatus(500)
    })

let validate = (req, res) =>
    handleResp(res, accounts.byCardNo(req.params.cardno), (row) => {
        if (row == null)
            return res.sendStatus(404)
        res.send({
            cardno: row.card_number,
            accno: row.accno})
    })

let getAccount = (req, res) =>
    handleResp(res, accounts.byCardNo(req.params.cardno), (row) => {
        if (row == null)
            return res.sendStatus(404)
        res.redirect('/account/' + row.accno)
    })

module.exports = {
    validate,
    getAccount
}

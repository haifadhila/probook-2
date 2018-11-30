const accounts = require('../model/accounts')
const transactions = require('../model/transactions')

let transfer = (req, res) => {
  senderNum = parseInt(req.body.nomorPengirim)
  console.log(senderNum)
  recvNum = parseInt(req.body.nomorPenerima)
  amount = parseInt(req.body.jumlah);

  (async () => {
    let sender = await accounts.byCardNo(senderNum)
    if (sender == null)
      throw new transactions.TransactionalError('no sender card')
    await transactions.doTransfer({
      accno: sender.accno,
      receiverno: recvNum,
      amount: amount,
      type: 'transfer'
    })
    return true;
  })().then(
    (result) => res.send(result)
  ).catch(
    (err) => {
      if (err instanceof transactions.TransactionalError) {
        res.status(400)
        res.send(err)
      } else {
        console.log(err)
        res.sendStatus(500)
      }
    }
  )
}

let show = (req, res) => {

}

module.exports = {
    transfer,
    show
}

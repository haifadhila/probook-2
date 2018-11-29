const user = require('../controller/user')
const transaction = require('../controller/transactions')

let index = (req,res) => {
    res.send({'message': 'Bank Service'})
}

module.exports = (app) => {
    app.route('/api').get(index)

    app.route('/api/user').get(user.getUser)
    app.route('/api/user').post(user.createUser)
    app.route('/api/user').put(user.updateUser)
    app.route('/api/user').delete(user.deleteUser)

    app.route('/api/transaction').get(transaction.getTransaction)
    app.route('/api/transaction').post(transaction.createTransaction)
    app.route('/api/transaction').put(transaction.updateTransaction)
    app.route('/api/transaction').delete(transaction.deleteTransaction)
}

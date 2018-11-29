let user = require('../controller/user');
let transaction = require('../controller/transactions');

let index = (req,res) => {
	res.send({'message': 'Bank Service'});
}

module.exports = (app) => {
	app.route('/api').get(index);

	app.route('/api/user').get(user.getUser);
	app.route('/api/user').post(user.createUser);
	app.route('/api/user').put(user.updateUser);
	app.route('/api/user').delete(user.deleteUser);

	app.route('/api/transaction').get(user.getTransaction);
	app.route('/api/transaction').post(user.createTransaction);
	app.route('/api/transaction').put(user.updateTransaction);
	app.route('/api/transaction').delete(user.deleteTransaction);
}
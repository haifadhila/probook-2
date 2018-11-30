const asyncDb = require('../db/async-db')

let rowToResult = (row) => {
    return {
        accno: row.id,
        name: row.name,
        cardno: row.card_number,
        balance: row.balance
    }
}

let byId = async (id) => {
    let results = await asyncDb.poolQuery(
        'select id, name, card_number, balance from accounts where id=?',
        [id])
    if (results.length < 1)
        return null
    else
        return rowToResult(results[0])
}

let byCardNo = async (cardno) => {
    let results = await asyncDb.poolQuery(
        'select id, card_number from accounts where card_number=?',
        [cardno])
    if (results.length < 1)
        return null
    else
        return rowToResult(results[0])
}

module.exports = {
    byId,
    byCardNo
}

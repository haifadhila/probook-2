const pool = require('./connector')

let withConnection = (body) =>
    new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err)
                reject(err);
            else
                body(connection).then(
                    (result) => {
                        connection.release()
                        resolve(result)
                    },
                    (err) => {
                        connection.release()
                        reject(err)
                    }
                )
        })
    })

let query = (connection, ...args) =>
    new Promise((resolve, reject) => {
        connection.query(...args, (error, results, fields) => {
            if (error)
                reject(error)
            else
                resolve(results)
        })
    })

let poolQuery = (...args) =>
    withConnection(async (connection) => await query(connection, ...args))

let commit = (connection) =>
    new Promise((resolve, reject) => {
        connection.commit((err) => {
            if (err)
                reject(err)
            else
                resolve()
        })
    })

let rollback = (connection) =>
    new Promise((resolve, reject) => {
        connection.rollback(() => resolve())
    })

let withTransaction = (body) =>
    withConnection((connection) => new Promise((resolve, reject) => {
        connection.beginTransaction((err) => {
            if (err)
                reject(err)
            else
                body(connection).then(
                    (res) => commit(connection).then(() => resolve(res))
                ).catch(
                    (err) => rollback(connection).then(() => reject(err))
                )
        })
    }))

module.exports = {
    withConnection,
    query,
    poolQuery,
    commit,
    rollback,
    withTransaction
}

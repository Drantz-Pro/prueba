const mysql = require('mysql')
const {promisify} = require('util')

const {database} = require('./key')

const pool = mysql.createPool(database);

pool.getConnection((err , connection) =>{
    if(err)
        console.log(err);

    if(connection)
        connection.release(); console.log("la base de datos esta conectada");
    return;
});

//convert to promise
pool.query = promisify(pool.query);

module.exports = pool;
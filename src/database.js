//Conexion general a la base de datos
const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'pq-developer',
    password: 'coluntoda1254',
    database: 'EBSCO'
});

mysqlConnection.connect(function(err){
    if(err){
        console.log(err);
    }else{
        console.log('DB is connected.');
    }
});

module.exports = mysqlConnection;
const mysql = require('mysql');

//mysql connection

const dbConn = mysql.createConnection({
    host: 'mykasa.cem1z8h4nqom.eu-west-1.rds.amazonaws.com',
    user: 'admin',
    password: 'mykasa1nspirze',
    port: "3306",
    database: 'mykasa' 
});

dbConn.connect(function(err){
    if(err) {
        console.error('Database Connection failed: ' + err.stack);
        return;
    }
    console.log("Database Conneceted Successfully!!!");

});

module.exports = dbConn;



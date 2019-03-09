const sql = require('mssql');
 
// const config = {
//     user: 'OEMNYCNET\\xdevtran',
//     password: '',
//     server: 'CPV-STG-SQL01', // You can use 'localhost\\instance' to connect to named instance
//     database: 'van_test',
 
//     options: {
//         encrypt: false // Use this if you're on Windows Azure
//     }
// }
const config = {
    user: 'devapp',
    password: 'T95L3_apr16',
    server: 'cpv-dev-sql01', // You can use 'localhost\\instance' to connect to named instance
    database: 'van_test',
 
    options: {
        encrypt: false // Use this if you're on Windows Azure
    }
}


 
sql.connect(config).then(() => {
    // return sql.query`select * from Person ` //where id = ${3}
    return sql.query`select * from Incident_test ` //where id = ${3}
}).then(result => {
    console.dir(result)
}).catch(err => {
    // ... error checks
    console.log('something broke 1...', err);
})
 
sql.on('error', err => {
    // ... error handler
    console.log('something broke 2...');
})

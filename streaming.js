const sql = require('mssql')

const config = {
    user: 'devapp',
    password: 'T95L3_apr16',
    server: 'cpv-dev-sql01', // You can use 'localhost\\instance' to connect to named instance
    database: 'van_test',
 
    options: {
        encrypt: false // Use this if you're on Windows Azure
    }
}

sql.connect(config, err => {
    // ... error checks

 
    const request = new sql.Request()
    request.stream = true // You can set streaming differently for each request
    request.query('select * from Incident_test ') // or request.execute(procedure)
 
    request.on('recordset', columns => {
        // Emitted once for each recordset in a query
    })
 
    request.on('row', row => {
        // Emitted for each row in a recordset
        console.dir(row);
    })
 
    request.on('error', err => {
        // May be emitted multiple times
    })
 
    request.on('done', result => {
        // Always emitted as the last one
        console.log(result.rowsAffected)
        sql.close();

    })


})
 
sql.on('error', err => {
    // ... error handler
})


const sql = require('mssql');
 
const config = {
    user: 'xdevtran',
    password: '',
    server: 'CPV-STG-SQL01', // You can use 'localhost\\instance' to connect to named instance
    database: 'van_test',
 
    options: {
        encrypt: false // Use this if you're on Windows Azure
    }
}


// async/await style:
const pool1 = new sql.ConnectionPool(config).connect();
 
pool1.on('error', err => {
    // ... error handler
    // console.log(err);
})
 
async function messageHandler() {
    await pool1; // ensures that the pool has been created
    try {
    	const request = pool1.request(); // or: new sql.Request(pool1)
    	const result = request.query('select 1 as number')
    	console.dir(result)
    	return result;
    } catch (err) {
        console.error('SQL error', err);
    }
}

